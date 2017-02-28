# 有趣的鼠标悬浮模糊效果

任务描述:

- 实现文字的流光渐变动画
- 背景图需要进行模糊处理
- 实现按钮边框的从中间到两边扩展开

任务描述中可知关键词:

- 文字渐变
- 动画
- 背景模糊
- 边框扩展

这里一个一个地来解决关键词:

## 文字渐变

文字渐变这个效果需要几个特殊的属性来实现, 分别是:

```css
.line {
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background: linear-gradient(to right, #f80e74 25%, #0ef8d8 40%, #f80e74 55%);
}
```

这里的`background-clip`支持几个属性, 本质就是定义从哪里开始裁剪背景, 但是对于值`text`的支持度就比其他的三个属性要低很多. 这里的text表明背景在文字外面就被裁剪了, 这样才能够让字体外面没有背景颜色, 导致设置了后一个属性后, 除了背景外什么都没有.

`text-fill-color`表明填充字体使用的颜色是什么, 这里将其设置为透明后就能够以背景颜色为字体颜色. 这个属性在现代浏览器上能够支持. 但是IE系列就挂掉了.

最后的`linear-gradient`就是实现一个渐变过渡, 让字体颜色具备渐变的效果.

通过设置这些值, 最终可以得到一句渐变文字. 下面来是实现流光效果, 这里说的流光效果也就是让背景移动, 从而使得字体的颜色不断变化, 要让背景移动, 需要用到:

```css
@keyframes move {
    100% { background-position: -200% 0; }
}
.move-bg {
    background-size: 200% 100%;
    transition: background-position .5s;
    animation: move 7s linear infinite;
}
```

这里之所以将背景的大小设置为宽度200%, 是因为背景需要空间来进行移动, 否则的话就需要将背景位置定义为具体的数而不能使用百分比. 这是为什么呢?

先来理解两个极端值: `background-position: 0% 0%` 以及 `background-position: 100% 100%`, 这两个值中, 前一个代表将图片的左上角放置在容器的左上角上, 而后一个则是将图片的右下角放置在容器的右下角上. 因此, 如果设定了背景大小为: `background-size: 100% 100%`的话, 那么无论`background-position`怎么增加减少, 背景都不会移动半分, 因为这个`background-position`中用的百分比是指占: **背景长/宽 - 容器长/宽 的 最对值的百分比**. 如果背景为100%, 那么得到的绝对值为0, 背景就无法动弹.

解释了这么多, 那么, 要让背景动起来, 就设定其长为两倍的宽度, 而关键帧: `move`中, 将背景最终定位在`-200%`中, 原因是, 由上面背景图片初始定位在: 0% 0%. 而大小设置为200%之后, 整体超出屏幕100%的大小. 要让移动自左向右, 也就是背景的右下角向右移动, 根据上面可知: 百分比减少时右下角就会向右移动.

而这里为什么是移动200%, 而不是移动100%? 由于背景的重复, 当移动100%时, 其实相当于移动到背景图的一半, 这个时候结束就会处于过渡的中段, 从而造成抖动. 所以需要将整张图片移动完才结束以避免这种情况.

## 动画

动画在这里只是在文字的地方用到了, 通过定义关键帧: 

```css
@keyframes move {
    100% { background-position: -200% 0; }
}
@keyframes move {
    to { background-position: -200% 0; }
}
```

关键帧在这里定义了每个阶段会修改的值, 浏览器自动地对可以运算的部分执行插值运算. 甚至, 我们可以在关键帧里面定义动画的动画函数, 来根据不同时段定义不同的效果:

```css
@keyframes multiple-t-f {
    0% {
        background-position: 0% 0;
        animation-timing-function: ease-in;
    }
    50% {
        background-position: -100% 0;
        animation-timing-function: linear;
    }
    100% {
        background-position: -200% 0;
        animation-timing-function: ease-out;
    }
}
```

这个是看资料的时候了解到的, 之前还一直以为只能用一种函数. 不过如果在100%处设置是没有用的, 因为动画已经结束了, 设定了也会马上还原成0%出的值.

## 背景模糊

这里用到的是css3的新属性: `filter`, 这个属性可以称之为"滤镜", 这里只用到了`blur`, 也就是模糊效果, 它本身还有许多的效果.

```css
.blur-bg {
    filter: blur(10px);
}
```

通过上面的方法就可以使得一个元素**以及其子元素**都变模糊, 因此内容不应该放在需要模糊的元素内部, 否则内容也会变得不可见.

不过这个写法兼容性并不好, 现代浏览器基本都支持了, 但是Edge浏览器不支持在`filter`内使用`url`方法. 以及IE系列全部不支持这个写法. 考虑旧版浏览器的话需要:

```css
.blur-bg {
    /* FireFox, Chrome, Opera 使用svg滤镜, 这个是在资料上看到的,
       不过对于现在版本的浏览器来说已经不用考虑这个问题了. 这里只是作个记录 */
    filter: url(blur.svg#blur);

    filter: blur(10px);

    filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=10, MakeShadow=false); /* IE6 ~ IE9 */
}
```

对于IE10 ~ IE11则需要将图片放在svg滤镜内:

```svg
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" 
     xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink"
     xmlns:ev="http://www.w3.org/2001/xml-events"     
     baseProfile="full">
     <defs>
        <filter id="blur">
            <feGaussianBlur stdDeviation="10" />
        </filter>
    </defs>
    <image xlink:href="mm1.jpg" x="0" y="0" height="191" width="265" filter="url(#blur)" />
</svg>
```

或者可以通过canvas来实现模糊效果. 可以直接兼容IE9以上的全部浏览器.

## 边框扩展

最后一个的扩展, 在这里用到了伪元素以及过渡: `transition`, 还有形变: `transform`. 后两者都是css3的新属性. 通过是伪元素进行`scale`形变, 并设定合适的形变**原点值**. 使得边框扩展效果得以实现.

其实这里还可以用svg, 或者可以用两个元素, 一个具有一定高度只进行宽度扩展, 一个具有一定宽度只进行高度扩展. 来实现相应的效果.