let weblist = $('.weblist')
let last = $('.last')

let x = localStorage.getItem('x') //获取到储存在本地的字符串
let xobject = JSON.parse(x) //变成对象
let hashlist = xobject || [
    { logo: "K", logotype: 'image', n: 'kafu', url: "https://space.bilibili.com/488970166/" },
    { logo: "R", logotype: 'image', n: 'rime', url: "https://space.bilibili.com/489046950/" },
    { logo: "H", logotype: 'image', n: 'haru', url: "https://space.bilibili.com/488976992/" },
    { logo: "K", logotype: 'image', n: 'koko', url: "https://space.bilibili.com/701522855/" },
    { logo: "I", logotype: 'image', n: 'isekai', url: "https://space.bilibili.com/488978908/" },
]
let simplifyurl = (url) => {
    return url.replace('https://', "").replace('www', '').replace(/\/.*/, '')//删除/开头的内容
}

let render = () => {
    weblist.find('li:not(.last').remove()   //删除除last外的所有li
    hashlist.forEach((Node, index) => {
        let li = $(
            `<li>
                <div class="site">
                    <div class="logo">${Node.logo}</div>
                        <div class="link">${simplifyurl(Node.n)}</div>
                        <div class='close'>
                            <svg class="icon">
                                <use xlink:href="#icon-close"></use>
                            </svg>
                        </div>
                    </div>
    </li>`
        ).insertBefore(last)
        li.on('click', () => {
            window.open(Node.url)
        })
        li.on('click', '.close', (e) => {
            e.stopPropagation()   //阻止冒泡
            hashlist.splice(index, 1)
            render()
        })
    });
}

render()

$(".addButton")
    .on('click', () => {
        let url = window.prompt('请输入新的魔女');
        if (url.indexOf('http') !== 0) {
            url = "https://" + url
        }
        console.log(url);
        hashlist.push({
            logo: simplifyurl(url)[0].toUpperCase(),
            logotype: 'text',
            n: url,
            url: url
        })
        render()
    })
window.onbeforeunload = () => {       //关闭浏览器监听事件
    let string = JSON.stringify(hashlist) //变为字符串
    localStorage.setItem('x', string) //把字符串保存到本地
}

// $(document).on('keypress', (e) => {
//     console.log(e.key);
//     let { key } = e
//     for (let i = 0; i < hashlist.length; i++) {
//         if (hashlist[i].logo.toLowerCase() === key) {
//             window.open(hashlist[i].url)
//         }
//     }
// })
