var webpage = require('webpage');
var page    = webpage.create();
var system  = require('system');
var word    = encodeURIComponent(system.args[1] || '传个参数啊, 哥');

var start = Date.now();

function evaluate(result, start) {
    var content = $('#content_left'),
        items = content.find('.c-container'),
        item;

    result.code = 1;
    result.msg = '抓取成功'
    result.time = Date.now() - start;
    items.each(function() {
        var $this = $(this);
        var title = $this.find('.t').text(),
            link = $this.find('.t>a').attr('href'),
            pic = $this.find('.c-img').attr('src'),
            
            info =  $this.find('.c-abstract').text() ||
                    $this.find('.c-span-last p:first-child').text();
        item = {
            title: title.replace('\n', '').trim(),
            info: info.replace('\n', '').trim(),
            link: link,
            pic: pic
        };

        result.dataList.push(item);
    });
    return result;
}
page.open('https://www.baidu.com/s?wd=' + word, function(status) {
    var result = {
        code: 0,
        msg: '抓取失败',
        time: Date.now() - start,
        dataList: []
    }, tmpResult;
    if (status === 'success') {
        page.includeJs(
            'https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js',
            function() {
                tmpResult = page.evaluate(evaluate, result, start)
                if (tmpResult) { result = tmpResult; }
                console.log(JSON.stringify(result, null, 4));
                phantom.exit();
            }
        );
    }
});
