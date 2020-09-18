# Easy Questions

## Question 1

用 flexbox 实现按比例分割的三列

```html
<div class="row">
  <div class="col-2"></div>
  <div class="col-7"></div>
  <div class="col-3"></div>
</div>
```

代码：

```scss
.row {
  display: flex;
  padding: 12px;
  background-color: lightblue;
}
[class^=col-] {
  min-height: 30px;
}
$color: (
  #00ccff,
  #00cccc,
  #00cc99,
  #00cc66,
  #00ffff,
  #990066,
  #990099,
  #9900cc,
  #9900ff,
  #99ff66,
  #cc0066,
  #cc3366
);
@for $i from 1 through 12 {
  .col-#{$i} {
    flex-grow: #{$i};
    background-color: nth($color, $i);
  }
}
```
实现效果：

https://jsbin.com/qahusop/edit?html,css,output

## Question 2