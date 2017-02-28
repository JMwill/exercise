# 自定义checkbox， radio样式

从前还没有尝试过自定义元素的样式, 趁着这一次的几乎就试一把实现自定义的按钮样式.

## 准备

实现相应的效果需要先把原来的系统效果隐藏掉. 这里找到的是`-webkit-appearance`这个属性, 这个属性可将任意的元素转化成相应浏览器定义的元素的外观如:

```html
<style>
.radio-div {
    -webkit-appearance: radio;
}
</style>
<div class="radio-div"></div>
```

上面这样就可以将一个div改造成一个单选按钮的样子, 当然只是有个样子而已.

我们这里用到的属性值为: `none`, 这个值可以将原来的input的的样子给隐藏掉, 从而为后面的自定义外观流出空间.

这里需要注意的是: 这个属性在现代浏览器上基本可以工作. 旧版浏览器却是并不支持. 具体的设置有很多如:

- checkbox
- radio
- button
- caret
- textarea

上面只是列举了一些属性, 这个不是关注的重点. 这里首先实现效果:

```html
<fieldset class="form-group">
    <legend>是男的吗?</legend>
    <label for="pseudoRadioIsMan">是</label>
    <input class="pseudo-radio" id="pseudoRadioIsMan" type="radio" name="man">
    <label for="pseudoRadioNotMan">不是</label>
    <input class="pseudo-radio" id="pseudoRadioNotMan" type="radio" name="man">
</fieldset>
<style>
.pseudo-radio {
    position: relative;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: solid 1px #ccc;
    vertical-align: middle;
}
.pseudo-radio:checked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: .5rem;
    height: .5rem;
    margin-top: -.25rem;
    margin-left: -.25rem;
    border-radius: 50%;
    background-color: pink;
}
.pseudo-radio:checked {
    border-color: pink;
}
</style>
```

这里通过判断radio是否选择来在其内部添加一个after伪元素来展示需要的外观. 不过这里的实现其实并不好, 因为input元素不是一个容器. 其余的实现如checkbox等的原理也是一样.

从这里可以知道:

1. 这个实现并不能兼容旧有浏览器, 在不支持`appearance`的浏览器中, 原有的按钮外观还在, 甚至还会出现两个按钮同时存在的情况,
2. input并不是一个容器, 不适合在其内使用伪元素
3. rem也不要在这里用了.
4. `border-radius`在IE8下也用不了

- 解决1, 我们这里就直接将input给隐藏掉`display: none;`, 
- 解决2, 需要用一个元素来替代input, 而且能够通过input来选择到, 这个时候就可以使用相邻元素选择, 替代的元素可以用任何喜欢的元素, 这里我倾向于使用`label`, **多个label可以对应一个input**, 这样也不会造成理解上的困难.
- 解决3, 换个单位.
- 解决4, 好像没有比较好的办法, 有看到这里而且有比较好的办法的烦请告知一下.

```html
<fieldset class="form-group">
    <legend>是男的吗?</legend>
    <label for="pseudoRadioIsMan-v2">是
        <input class="pseudo-radio-v2" id="pseudoRadioIsMan-v2" type="radio" name="man">
        <label for="pseudoRadioIsMan-v2"></label>
    </label>
    <label for="pseudoRadioNotMan-v2">不是
        <input class="pseudo-radio-v2" id="pseudoRadioNotMan-v2" type="radio" name="man">
        <label for="pseudoRadioNotMan-v2"></label>
    </label>
</fieldset>

<style>
#pseudoFormV2 input {
    display: none;
}
.pseudo-radio-v2 + label {
    display: inline-block;
    position: relative;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: solid 1px #ccc;
    vertical-align: middle;
}
.pseudo-radio-v2:checked + label::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 8px;
    height: 8px;
    margin-top: -4px;
    margin-left: -4px;
    border-radius: 50%;
    background-color: pink;
}
.pseudo-radio-v2:checked + label {
    border-color: pink;
}
</style>
```

使用雪碧图的实现也是差不多, 只是原来由伪元素显示的样式改由label本身来体现, 将背景设定到相应的位置可以.

作为对比的是, 雪碧图需要进行的设置相应会少一些, 而且兼容性比伪元素要好, 但是灵活性则较低, 伪元素修改几个地方就能够实现不同的效果, 而雪碧图则需要重新制作一个图. 不过
