/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/404.html","4387d2b380ac9eb8908c3854e9fc00cb"],["/about/index.html","1dfaf7720c1b197079d6d13e8c06fe0d"],["/archives/2023/09/index.html","fa8c8575f0969677d48dba1805590c50"],["/archives/2023/10/index.html","2d9c6ef05e8b5b165a5278a92802fdc5"],["/archives/2023/11/index.html","23b4fc409ececba47a30d76b1906fd8c"],["/archives/2023/12/index.html","26cf100ca0860d2d4d268634101f5504"],["/archives/2023/index.html","e80fdc26ea6a7b93a74e780b74385dd7"],["/archives/2024/01/index.html","b4f3df1cc3277716853b105a09cdf9db"],["/archives/2024/02/index.html","df10b1c89393bf8516e21b34b9bfe377"],["/archives/2024/03/index.html","069626c7ddc659fc8c863945a5371d19"],["/archives/2024/index.html","114ed1819a08d02d79ce1641e14e9caa"],["/archives/index.html","ea9b1abc4041b65c66315b9cc2dee6ae"],["/assets/build/styles.css","e8355bd1bbe04a2377568c4a407119f4"],["/assets/hbe.style.css","c94ef63e0056de67b35bf1385cd23136"],["/assets/odometer-theme-minimal.css","d50a198c326f1767cdaecdb7c67b392d"],["/categories/ideas/index.html","a4e9659e5471c7d1cb071cef2384850b"],["/categories/index.html","2ecfbb002fe584fed5265dca19f56336"],["/categories/math/index.html","11e1216dd873ad043978a7570c66bfa2"],["/categories/note/index.html","23118820d2460abc259aee88739d3230"],["/categories/note/page/2/index.html","1baeccf5a5be1f2443740ceecf58b533"],["/categories/note/page/3/index.html","8267cf863c4bbf075401a2d298408934"],["/categories/note/page/4/index.html","d8d05f43edc6ae3aa38a5a863d01285d"],["/categories/note/page/5/index.html","3f8d0e8feffecb76a28dc78d834dd2f0"],["/categories/note/page/6/index.html","2e7867ecb8e44459652d22eacd824a2f"],["/categories/note/problem/index.html","f8c87e61bdb45135dd316198c67111d7"],["/categories/problem/index.html","b2a8fd14f58bbef78b9e5a06fb37280a"],["/categories/problem/page/2/index.html","81137094c168dd645ec4628d78a9af4e"],["/categories/problem/page/3/index.html","9035348617e4198745718c6d0cfdf1de"],["/categories/problem/page/4/index.html","11333ee37150ff2d8168f62bf629c92f"],["/categories/problem/page/5/index.html","af73a222d2804b618df8dcc96cf47959"],["/categories/problem/page/6/index.html","3cbf68b35f4485939d00b37051cc8f03"],["/categories/technology/index.html","e5fc77051fb34e78c2b429ed62ca4f7c"],["/categories/杂谈/index.html","e8bb59ac61e5cb6eb4478196c1cd13cc"],["/categories/碎碎念/index.html","47f1b37f3e750be3fccb641345028058"],["/categories/碎碎念/杂谈/index.html","509ce766d86973584e82747a56570c51"],["/css/common/animated.css","b2aecba9b34c3593d241f2c118a98ae1"],["/css/common/basic.css","7f0ff1d77c9c5fb76023ff1779d9e98f"],["/css/common/codeblock/code-block.css","641572522f017055b703ba651693e89b"],["/css/common/codeblock/code-theme.css","a0ebfd1c37296db7537a252a6eb4ba71"],["/css/common/codeblock/highlight.css","047bfc2a102adb26a67d26d6cfb370de"],["/css/common/markdown.css","0f093295106a47da4a5bf33ed123c1a4"],["/css/common/redefine-theme.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/common/variables.css","cc6a286463eb421ebd870763d97fe051"],["/css/hbe.style.css","c94ef63e0056de67b35bf1385cd23136"],["/css/layout/archive-content.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/layout/article-content.css","7794e8a50e47703216223fe2c2f83c1b"],["/css/layout/category-content.css","4e0b84217a0d3632750ae6bf0d56ba6f"],["/css/layout/category-list.css","cd856dcc7f0daded2dad18b6ff213707"],["/css/layout/home-content.css","9b8e2b763443ab72cc5ce715a6a5fb3d"],["/css/layout/home-sidebar.css","16d12a6625e4a18ee2bc52ee096e8ba2"],["/css/layout/page.css","8ed1350276654c632042b3dd96cce1ad"],["/css/layout/tag-content.css","e792ee43f1efd78cfa3dbd9044969b4f"],["/css/style.css","f651539842db99d600bbb99ddd4f4924"],["/fontawesome/all.min.css","9ec513d705ed7f4deb2b50bb05914817"],["/fontawesome/brands.min.css","40960f6969b87896c9889de920787ae8"],["/fontawesome/duotone.min.css","6d17219d846a2851c2ed490a62dd38cb"],["/fontawesome/fontawesome.min.css","7f252c83010f3cada47ee6a6f71d1ee8"],["/fontawesome/light.min.css","99d663cdb4567e9c0c000fc52c670fb8"],["/fontawesome/regular.min.css","020abce5e17082f0f18f92aed092c0b0"],["/fontawesome/sharp-solid.min.css","20abfb823fecc8a6a73458c5edd394f9"],["/fontawesome/solid.min.css","f484f18056587df321165f744e9ba571"],["/fontawesome/svg-with-js.min.css","c40530bda390deaaed914c49f34d9e1e"],["/fontawesome/thin.min.css","f44cae780bf8a7287221c340cbe4d815"],["/fontawesome/v4-font-face.min.css","52325430f1fa7f983a32f712ebb59b3a"],["/fontawesome/v4-shims.min.css","4d764578be067a44af663d56be333195"],["/fontawesome/v5-font-face.min.css","1cb7f16555da63aecd2828d3d3130d85"],["/fonts/Chillax/Chillax-Variable.eot","f8ea7af333c768147f674ba526612248"],["/fonts/Chillax/Chillax-Variable.ttf","5f13274ffe3e1ee77b67324cb1a9cf7c"],["/fonts/Chillax/Chillax-Variable.woff","16fee1e0f2e5db01ad15ce4535ad39e2"],["/fonts/Chillax/chillax.css","0d2090517a2cb42f32bd86454b2bb1e0"],["/fonts/Satoshi/Satoshi-Variable.eot","f953920d265c265d55029a0044a7b122"],["/fonts/Satoshi/Satoshi-Variable.ttf","bc0207192e408b721fa14151690c6a66"],["/fonts/Satoshi/Satoshi-Variable.woff","bd7cac4b844318aa2b2f168b57b45c22"],["/fonts/Satoshi/Satoshi-VariableItalic.eot","9888965098b0fe3121439e5293e5f63d"],["/fonts/Satoshi/Satoshi-VariableItalic.ttf","db98db5c0d84369d2586aaf5eedc3376"],["/fonts/Satoshi/Satoshi-VariableItalic.woff","aa09c255fd899a8d89fc4636c0c9db4d"],["/fonts/Satoshi/satoshi.css","1baa156aca1baa1b570089def9ee55ec"],["/fonts/fonts.css","c96283423d2ff104322986b7338b3eba"],["/fonts/noto-sans-sc-v26-chinese-simplified-700.woff","3575965a87411920b48f5bd97b38810d"],["/fonts/noto-sans-sc-v26-chinese-simplified-regular.woff","0ed89b72b63509b506025450c77bfe43"],["/fonts/ubuntu-mono-v15-latin-regular.woff","86bd37776667f31cd9c6d0a2a9fa7ef5"],["/image/Violet 1.jpg","eb023ca433bc1de215c0a0d15fd1d616"],["/image/author.jpg","44d0486db9384c602d929f1ec2f519f9"],["/images/loading.svg","e1de41eda143447d3b338e77f7ace18f"],["/images/redefine-avatar.svg","fd210fedbfe357f35c570f61b943481b"],["/images/redefine-favicon.svg","badc8db1a4c3d1845db4e4ffec333d9e"],["/images/redefine-logo.svg","80a88fff4a3bb50559543e80477aa571"],["/index.html","866e2f2be6c2c655b8bb971d577f6729"],["/js/layouts/categoryList.js","be8705c55bfaa476c5cf3fd995409305"],["/js/layouts/lazyload.js","728031a7240822da29d5bd927d1e1727"],["/js/layouts/navbarShrink.js","43a834b08201e6db83de9c56ea05d4b6"],["/js/layouts/toc.js","cb98abb318dc0eda4bac6ec6d43faf10"],["/js/libs/APlayer.min.js","8f1017e7a73737e631ff95fa51e4e7d7"],["/js/libs/Swup.min.js","9ff02a08a69fe4addbd9af33359deabf"],["/js/libs/SwupPreloadPlugin.min.js","170c2637b152f61a7225171523b9e5f3"],["/js/libs/SwupProgressPlugin.min.js","f9eb5c6b192ac1dcd18b12666a647fd0"],["/js/libs/SwupScriptsPlugin.min.js","30935c9aeeb587c49d2e30c28f57c5e7"],["/js/libs/SwupScrollPlugin.min.js","85fe68c41c48170dd104ee4f29690798"],["/js/libs/SwupSlideTheme.min.js","2b1d521e1b83b5ffc073ad31045e682a"],["/js/libs/Typed.min.js","f68641147185cbded4b38b4900a20f40"],["/js/libs/anime.min.js","864a144dbbc956381a47679ec57ab06c"],["/js/libs/mermaid.min.js","07d4a62ba2e5b0e44077bd9b481fd75d"],["/js/libs/minimasonry.min.js","a3b6453136c8edd4fdd374171f022ffa"],["/js/libs/odometer.min.js","519a5777444f5965b6df23e26c69f037"],["/js/libs/pjax.min.js","d810aff16a7f45392bdeec5493ebee8e"],["/js/main.js","295801b1c2b4f7fd1d85f34fadc94805"],["/js/plugins/aplayer.js","13934c08bc9325eaad918b497d1216fd"],["/js/plugins/hbe.js","e3e4ff16a0beaa851e3926b5d26079c7"],["/js/plugins/masonry.js","5a2fb5815ba12e2efb0323a526dc623f"],["/js/plugins/mermaid.js","929a9284ea999064bc6842d28bf9f102"],["/js/plugins/tabs.js","a6eca0aaba3fd4a5cb8539b129d742cf"],["/js/plugins/typed.js","b3456d138a26a01d00f06e4fcc0a0477"],["/js/tools/codeBlock.js","187983273eb159f9fab0f4bb8d4d02c3"],["/js/tools/imageViewer.js","c6e3a4bbd5ee5fbe51806092601127f9"],["/js/tools/lightDarkSwitch.js","ab6260f82f3916594294df5ff3e86c94"],["/js/tools/localSearch.js","d9ecf11b97c82251978084566e399426"],["/js/tools/runtime.js","87f27761db6f7a197f99739804ee0c1d"],["/js/tools/scrollTopBottom.js","d984b4612439ba4d47813e1dd1bf46f2"],["/js/tools/tocToggle.js","cd72e98af728161a67fa6b2df9b28d5a"],["/js/utils.js","0cb3343ba95bde5bb08690b6b49b6c5d"],["/lib/hbe.js","e3e4ff16a0beaa851e3926b5d26079c7"],["/page/10/index.html","fa3f8adf22a184a5258068470b6859a9"],["/page/11/index.html","54c201c1002fd797c0cf2abfc1ba8449"],["/page/12/index.html","427ebfebade4ee1c3ecc128bf31cef1a"],["/page/2/index.html","f485d1687c3225e0d32e3de9efd1ea2d"],["/page/3/index.html","aed0438867d82ea446a42de03e919302"],["/page/4/index.html","973a10638b93749f05d66ba6cadcf818"],["/page/5/index.html","b9a9e9d6e8604dee5c5c6e0ae0faf4b4"],["/page/6/index.html","232a482d64aba5d145e435131f931fe0"],["/page/7/index.html","4dad48eec790aba2d73d9caa32246b7a"],["/page/8/index.html","1fbfc2301f34a90f818f882b1a152a98"],["/page/9/index.html","689b9e0843ae9595cbd6b950412c92f2"],["/sw-register.js","e181930a6346655f7ae1b2c9de2f28cc"],["/tags/2-SAt/index.html","04aa6c2c90af669a9c565e9696b2c82b"],["/tags/AC自动机/index.html","1b5b20538ea1f9896f926b98ad34a46d"],["/tags/DFA/index.html","c8deb68b5106cf70b5bf170c74bb23c2"],["/tags/Exkmp/index.html","ee43a3ba6fadd82a24bae2bc1861c65a"],["/tags/Fhq/index.html","2dd6ee98f1ef27fc672dbefefdab697b"],["/tags/Hash/index.html","cf029097be85e2692775600a7015ea44"],["/tags/IDA/index.html","3282e791a6f71e2ebccc81730b66d3aa"],["/tags/KD-Tree/index.html","69bcf8d05e858df5141f2e853f31730e"],["/tags/KMP/index.html","ff0a227cbab9c5c09e538875db7a182e"],["/tags/Kru-重构树/index.html","e11f1528a60bd35d220f2c8f603d29dc"],["/tags/Kru重构树/index.html","9330e402d328be03ca7c3165efe8075d"],["/tags/LCA/index.html","678c7d7c9f61cab3adba02b90582c333"],["/tags/LCP/index.html","5ae3c74cada06e3a749b79643dc5702b"],["/tags/MST/index.html","c44e5bd97ac9f1f8d2aa3f1d31e86399"],["/tags/Tarjan/index.html","5a9f415272db1024c49f8891e2983742"],["/tags/Topsort/index.html","337cd43439f26c359ae29bf74a1198b1"],["/tags/Trie/index.html","af4097bb881c0dc2dbfe553b3bea0a13"],["/tags/cdq分治/index.html","09244f2a8ddf5628e34b9a63d2bca8c8"],["/tags/index.html","f18b6dd7a392a883609124c683c17643"],["/tags/manacher/index.html","c81b61c6d332dae75656f110a329825c"],["/tags/math/index.html","ee2bf67bc64a32dd3a14b96b4a2e91dc"],["/tags/三分/index.html","6110bc07ae35f7658a95f9d1d6e8f78d"],["/tags/二分/index.html","20c537fd9e69ac8e424d588ede6838f4"],["/tags/二分图/index.html","52dc9e16ac866e00c1aaedfe2aab0f93"],["/tags/二维数点/index.html","5b6c971bf2bf8eda34e82ed3dfe6bdd4"],["/tags/众数/index.html","298631bc0bec884bc331842987093551"],["/tags/倍增/index.html","a26b3705ce03bb21b54492abfd098ab7"],["/tags/偏序/index.html","f7259aef4ba9919845a13bbdc90e225f"],["/tags/分块/index.html","e832c1a9eec79b4c1203ed61907e9f54"],["/tags/分治/index.html","2c04b1167c66aff80dddddfb2dae6842"],["/tags/前缀和/index.html","a0524d608c3caf4963005e5f6b97b72f"],["/tags/动态开点/index.html","c4b7e3bfda55f77de1ed20a29324ee8d"],["/tags/动态开点权值线段树/index.html","5b49be1dbf0fa39b7252bb7712ecedf5"],["/tags/区间-Dp/index.html","b7436f43fa7c20be45dff195b398a25a"],["/tags/博弈论/index.html","c332a952febcdc6e67ea3b69cb1d6073"],["/tags/双指针/index.html","26e32f2e22e4a0e8fcfada0d15b2ed06"],["/tags/双端队列/index.html","6ca75a95cadb569c71a840bbf44d51ee"],["/tags/可持久化/index.html","140357ca6d72fd5e2c48a5d9a6101d09"],["/tags/可持久化平衡树/index.html","17eedfc1f125cfedacb30648e76b3c3e"],["/tags/可持久化并查集/index.html","125d2864ecd965b903692a355873bc84"],["/tags/可持久化线段树/index.html","86f3fb27ec79f581e1601d3726a3fd12"],["/tags/可撤销并查集/index.html","a11afdc92271b2f5a463a0877f0ab615"],["/tags/后缀数组/index.html","ef77bc0a0ed2850b5dbc32f8759c270b"],["/tags/后缀自动机/index.html","89a79b20111250d101f33d9720a6d4fc"],["/tags/启发式合并/index.html","56af83000bc94f3656d4be72ff058e07"],["/tags/回文自动机/index.html","b025cc2d4cea4ea06106c100dd33971a"],["/tags/回滚莫队/index.html","92d4c268535d00f824efb8258800e6fc"],["/tags/图论/index.html","e50aa252cda7f770d940cf2a9a8380e5"],["/tags/圆方树/index.html","bbfce15edbd887cf0fcbc8e8072d78bf"],["/tags/均摊分析/index.html","fb0b0d8f3d697f8d11f8e66ff17abc49"],["/tags/基环树/index.html","3fb48f72c7a2c06957efc8e51d95a0f0"],["/tags/堆/index.html","c4c96a6a0ffc78a1280fc814cf1a503c"],["/tags/复杂度分析/index.html","98e11e12a0ad1ad4804a0abfeb8817d3"],["/tags/复杂度均摊/index.html","576f1812d6f00413dfa5b14df743f7be"],["/tags/多元处理/index.html","eaa5e9f8c89f49d3007d5561f75b95ea"],["/tags/多项式算法/index.html","f0ca9000afa6cc162ba2d57a493a81c4"],["/tags/字符串/index.html","d907b51b2b780aa5dc50ffa1b835f00a"],["/tags/容斥/index.html","8c2cf09140b8df4a07f93ab13cc8b3f0"],["/tags/容斥原理/index.html","17ca116045ff2845ace35ec1d7582353"],["/tags/对顶栈/index.html","e100b3e7d091e894a20c2179c27c3e4a"],["/tags/导数/index.html","16f258f4f9f4e764d718872d71b07695"],["/tags/带修莫队/index.html","2bafa8a0c58d22727c3df0c5a1b546d8"],["/tags/平衡树/index.html","c3ca153add64bcb07dd66500b9c23498"],["/tags/并查集/index.html","947f002eb74b546b92c45ee5be0337c0"],["/tags/序列自动机/index.html","6ffa0600aa424c3dbcdec75e124da1d5"],["/tags/归并排序/index.html","6ad14793e8d2234f418510d7864ba5e8"],["/tags/待修ST表/index.html","159fd70ff8ef95f49e2f20641552697f"],["/tags/循环节/index.html","7ac7c292dfd4e9be2a14282b96c4bec1"],["/tags/思维/index.html","5271954d74f58ceaa595b00ca12c0cd7"],["/tags/思维/page/2/index.html","a38bc448fd87e2520ba673440aca1aa4"],["/tags/思维/page/3/index.html","0d4653a03f23ea9a8205be67b1543068"],["/tags/拉格朗日插值/index.html","b7433ee3e0a048986ade64a5c551f011"],["/tags/换根-Dp/index.html","57b5852b98cd0a697731b2ba7d713b14"],["/tags/搜索/index.html","98d1647e2f1ffc5740972dc60eb761d4"],["/tags/数学/index.html","8db1725668f080a4cab82fd9c2d720c7"],["/tags/数学/page/2/index.html","97aa4a33db6d9f4a366bcf33c02be7de"],["/tags/数据结构/index.html","8242973fb634412d88062f3f37819aed"],["/tags/数论/index.html","baf878bbfc6330b60dd64f2e5300b5bd"],["/tags/整体二分/index.html","6f10028d7fed5ee8b20e22b02da0a2b0"],["/tags/整除分块/index.html","8ea2b467154ebdaa88b6a787563880fc"],["/tags/斜率优化-Dp/index.html","8798f45dfb6989581d310f18dfe7e148"],["/tags/最大流/index.html","32de7ea66bfc1a35e08bb2bdc5b852c3"],["/tags/最小割/index.html","3f5672b782de652845c33c258bfb6e2e"],["/tags/最小割树/index.html","0662bbe887f5487d04c87b45a9f66c19"],["/tags/最小生成树/index.html","d1cf017e1a0e2a8d22d3f977e383abe3"],["/tags/最短路/index.html","1694f26f71f650c383a4508e35882a7c"],["/tags/期望/index.html","3ff27ab93186d93bc8bbaafafcf0ce93"],["/tags/杂谈/index.html","595b68ae9fe63d1b54e39c94c873535b"],["/tags/权值线段树/index.html","7ceb7ab3e308c71a362838068e6af548"],["/tags/栈/index.html","ac283b81e3e7aa264ca4882130c839c0"],["/tags/树上莫队/index.html","97646494151ab633b3513bc93a9f7221"],["/tags/树剖/index.html","d8058326175209e1995c1af8cb88df35"],["/tags/树套树/index.html","59af5693aa7d69c641db671db4aeaad9"],["/tags/树形-Dp/index.html","253c74040bda7604802ea4bfb90c8f0d"],["/tags/树形-Dp/page/2/index.html","9cd36e99530cfacc368cc017200d8415"],["/tags/树状数组/index.html","46cf35428794c968b893b27c82409aac"],["/tags/根号分治/index.html","a5bb34174ea0409086ed19a11afe8ed6"],["/tags/概率/index.html","fa72eeae893d8c1158b9d9440fbca06c"],["/tags/状压-Dp/index.html","b91368e92f47a12d1ff74e2b6ef12f65"],["/tags/状态压缩/index.html","f3c351af09037d208d0d7e1f8930f1b1"],["/tags/珂朵莉树/index.html","e31769fb1bd6ee0bb4b732303b5ad03d"],["/tags/矩阵/index.html","5ac9b48dc28287af50111f98682d6b9d"],["/tags/碰撞/index.html","e8a60d5b0a41ec7bab498a0b5dbb70bf"],["/tags/线性-Dp/index.html","dab40e9e63c5b943f3d3147f7080bc31"],["/tags/线性-Dp/page/2/index.html","8b4ff856e3fec084c10579c08153b3b2"],["/tags/线性基/index.html","49a47d1bb10efbd82e29b48880f06ea8"],["/tags/线段树/index.html","93932b8d2d0cec21c6f13b3f5b1386f8"],["/tags/线段树/page/2/index.html","969e11b618446b8d6a128bd303781940"],["/tags/线段树二分/index.html","90c88be4147a91ccad011f5f35c071a2"],["/tags/线段树合并/index.html","b6373713a020be0cfca5909c59da7bc9"],["/tags/组合数学/index.html","02026c1e285854fb7ce0b10f527a56f9"],["/tags/网络流/index.html","e40c2e3a39dbbf3b58dcfd7783a52ec5"],["/tags/置换环/index.html","5b0183274c31c74cec296fb0799b56c2"],["/tags/莫比乌斯反演/index.html","3c97fe4e67e4d3f1c28c214ec6d30ad8"],["/tags/莫队/index.html","156105c576c0ff80a7dfead7c44ce80f"],["/tags/虚树/index.html","472ab5fdba75cdd1427959388f11e159"],["/tags/贪心/index.html","5b631eb6188fdaccf0035b0500918ea3"],["/tags/费用流/index.html","aec1e88316a4b9d8212f909b34ae763d"],["/tags/轮廓线-Dp/index.html","6e66fa7892992baa19e7059bf552c47e"],["/tags/连续段-Dp/index.html","83f58164ef9d5421310e44c01bdb7442"],["/tags/逆序对/index.html","760247849762b871e371ddfa585f298b"],["/tags/长链剖分/index.html","95ec69f8f91e9899ddae23c5022a3091"],["/tags/随机化/index.html","ea9e3cdf70f7500263c5d540383b220e"],["/tags/高斯消元/index.html","8bd3d88006424ac9a87626e1f9e2a54b"],["/undefined/2-SAT/2-SAT/index.html","382a250a5e185ba1fe1d060b02250cc8"],["/undefined/23总结/23总结/index.html","1b8e64f66ebc4f3592ba04feedff481f"],["/undefined/ABC248-F/ABC248-F/index.html","ba5f9cc44967744d79b1b514d294a880"],["/undefined/ABC277-G/ABC277-G/index.html","cc6547cbc2260b244c80ba8cc0cbffc5"],["/undefined/AT-dp-y/AT-dp-y/index.html","d03533b2f99339104c5377e36fc1d099"],["/undefined/Boruvka/Boruvka/index.html","c7a352c53e04216336b7a1c0aa001ae7"],["/undefined/CF1876/CF1876/index.html","508d6eaf59e81a17f3b4d2c6b3ff2340"],["/undefined/CF27E-Number-With-The-Given-Amount-Of-Divisors/CF27E-Number-With-The-Given-Amount-Of-Divisors/index.html","dfceb5c88abbe91096e89f0eb9b990e7"],["/undefined/CF708C-Centroids/CF708C-Centroids/index.html","add0d3b298306ed0bc959143eecb93d1"],["/undefined/DFA-全家桶/DFA-全家桶/index.html","df3e2dbe286aee586c0b53c4943e9fbc"],["/undefined/Dfn序-欧拉序/Dfn序-欧拉序/index.html","15f81595e374c2a5fc40736d6d77565b"],["/undefined/EXSTL-Pbds/EXSTL-Pbds/index.html","762b57809a3ef993a12ab725809a5ded"],["/undefined/EXSTL-Rope/EXSTL-Rope/index.html","5b77d0326998eda61d662ee948a6180f"],["/undefined/Extra-树状数组/Extra-树状数组/index.html","3e12e8f4124c49f2e6d8aa1bad750d89"],["/undefined/Extra-线段树-优化建图/Extra-线段树-优化建图/index.html","f79d649fd8cbcdb1070e3ef1c27da047"],["/undefined/Extra-线段树-动态开点 && 权值线段树/Extra-线段树-动态开点 && 权值线段树/index.html","253841487062591803bf37d2a4894f51"],["/undefined/Extra-线段树-线段树分治/Extra-线段树-线段树分治/index.html","bdfc4f3963a6c02cb52de98a4b4d8cbe"],["/undefined/Extra-线段树-线段树合并/Extra-线段树-线段树合并/index.html","ed14bc86898af1cf8e8ca9ee648330bb"],["/undefined/Hash/Hash/index.html","b9ff12e894bdd380d51a9f83a0dfba46"],["/undefined/IDA-拯救世界/IDA-拯救世界/index.html","6211d7691c01d3684caa24a3c8c0584e"],["/undefined/KD-Tree/KD-Tree/index.html","fea328cb1771e5e88d5242a4d20888c5"],["/undefined/Kru重构树/Kru重构树/index.html","fc539fa84658a0b0d4bb95c0a6acf670"],["/undefined/Last-Season-1-CSP/Last-Season-1-CSP/index.html","2b2be01464fd10e396cee63ee7ba64b6"],["/undefined/Luogu-Simu10/Luogu-Simu10/index.html","03caa3b049d76b82e3a0e417039fe8c7"],["/undefined/Luogu-Simu4-T1/Luogu-Simu4-T1/index.html","784226f5370532c6a5047f90e2d2cd3c"],["/undefined/Luogu-Simu4-T2/Luogu-Simu4-T2/index.html","bcb1811c0a8123b70de954d05825f74a"],["/undefined/Luogu-Simu5-T1/Luogu-Simu5-T1/index.html","cad72cd495b98d607a8c3b3a17584c30"],["/undefined/Luogu-Simu5-T3/Luogu-Simu5-T3/index.html","9f380799c6eff16500bc2917b7a76439"],["/undefined/Luogu-Simu5-T4/Luogu-Simu5-T4/index.html","25335fb3bc09c3fe3f6693f4f2209764"],["/undefined/Luogu-Simu6-T1/Luogu-Simu6-T1/index.html","211c330e69addea77a6732a1f86a22ff"],["/undefined/Luogu-Simu6-T2/Luogu-Simu6-T2/index.html","f8d11a9ea9b07185bdc3ece5d02f48be"],["/undefined/Luogu-Simu6-T3/Luogu-Simu6-T3/index.html","be4294e613ffeebb174c75cb66636b51"],["/undefined/Luogu-Simu7-T3/Luogu-Simu7-T3/index.html","14b08a3471e3771f4050ac6406f37ba2"],["/undefined/Luogu-Simu7-T4/Luogu-Simu7-T4/index.html","556ad4ed518bf73605f47128217636ca"],["/undefined/Luogu-Simu8-T1/Luogu-Simu8-T1/index.html","ffd229f8118932e77a9fc894b29eac3f"],["/undefined/Luogu-Simu9-T2/Luogu-Simu9-T2/index.html","545713d15ef6a49257f0dd6ce3f3373f"],["/undefined/P2150-NOI2015-寿司晚宴 & P8292 [省选联考 2022] 卡牌/P2150-NOI2015-寿司晚宴/index.html","67f44394c5ec57f67eab8f0ee4fdb599"],["/undefined/P2157-SDOI2009-学校食堂/P2157-SDOI2009-学校食堂/index.html","54033f374cf7aaedb2465e680fef8c65"],["/undefined/P2331-SCOI2005-最大子矩阵/P2331-SCOI2005-最大子矩阵/index.html","5b48fd27496b33dda9a341c5e49d0593"],["/undefined/P3253-JLOI2013-删除物品/P3253-JLOI2013-删除物品/index.html","64d1c54a753f9c74b96ff76269afda2a"],["/undefined/P3551-POI2013-USU-Take-ou/P3551-POI2013-USU-Take-ou/index.html","b7ddfb0288840791aafa4e119d0bd559"],["/undefined/P3668-USACO17OPEN-Modern-Art-2-G/P3668-USACO17OPEN-Modern-Art-2-G/index.html","553589474c87dba043e0609fa5f064bf"],["/undefined/P4824-USACO15FEB-Censoring-S/P4824-USACO15FEB-Censoring-S/index.html","334d6ac129b6ba5698b6f152731e11a2"],["/undefined/P4940-Portal2/P4940-Portal2/index.html","583318da58b197ce5d8e78ad732be037"],["/undefined/P5426-USACO19OPEN-Balancing-Inversions-G/P5426-USACO19OPEN-Balancing-Inversions-G/index.html","af1b0dd94cc38ddc6751037dd71cfaec"],["/undefined/P5522-yLOI2019-棠梨煎雪/P5522-yLOI2019-棠梨煎雪/index.html","d34b8d6b2c26cb5bf1b651436665821d"],["/undefined/P5835-USACO19DEC-Meetings-S/P5835-USACO19DEC-Meetings-S/index.html","53cb8b2d7e6f0f7c64e6710f3414645f"],["/undefined/P5978-CEOI2018-Global-warming/P5978-CEOI2018-Global-warming/index.html","e25163dd8feebd47e57eb68c14a25485"],["/undefined/P6064-USACO05JAN-Naptime-G/P6064-USACO05JAN-Naptime-G/index.html","0f6028807cfc0bf4feedc8c562dd0ef3"],["/undefined/P6148-USACO20FEB-Swapity-Swapity-Swap-S/P6148-USACO20FEB-Swapity-Swapity-Swap-S/index.html","35869dc23e1ab9f20893a3e1d673c2a3"],["/undefined/P6381-『MdOI-R2』Odyssey/P6381-『MdOI-R2』Odyssey/index.html","b15ee6c9a2d2e2be2f8d5c95f279bc08"],["/undefined/P7077-CSP-S2020-函数调用/P7077-CSP-S2020-函数调用/index.html","31c479c3e2a8def74b4efdf461dfcb6d"],["/undefined/P7108-移花接木/P7108-移花接木/index.html","0ed68e0562d142023c88ca246cd4fef3"],["/undefined/P7249-BalticOI-2012-Day1-移动网络/P7249-BalticOI-2012-Day1-移动网络/index.html","84b79e22d1795d95578cdc38a9c2fd84"],["/undefined/P7291-「EZEC-5」人赢-加强版/P7291-「EZEC-5」人赢-加强版/index.html","f2e79d8da48f8eefb596df8c0af97ce4"],["/undefined/P7355-「PMOI-1」抽奖/P7355-「PMOI-1」抽奖/index.html","4fcc4c58476bf5abb4f8a9af8215592d"],["/undefined/P7789-COCI2016-2017-6-Sirni/P7789-COCI2016-2017-6-Sirni/index.html","d99969ee28b4be7fc3503acfa2a361e5"],["/undefined/P7811-JRKSJ-R2-你的名字。/P7811-JRKSJ-R2-你的名字。/index.html","59e69a5e8431565da4dbc15357ef9498"],["/undefined/P7915-CSP-S-2021-回文/P7915-CSP-S-2021-回文/index.html","d764bce746e286467d6cdc40f2eb24b1"],["/undefined/P8252-NOI-Online-2022-提高组-讨论/P8252-NOI-Online-2022-提高组-讨论/index.html","82c0ee0aed2b82aa6b29b6df577d8d22"],["/undefined/P8365-LNOI2022-吃/P8365-LNOI2022-吃/index.html","24cd629f61edcf6977cc3ac521609dc8"],["/undefined/P8817-CSP-S-2022-假期计划/P8817-CSP-S-2022-假期计划/index.html","d7ba3024427d75bccf1827dbf4d92c94"],["/undefined/P8905-USACO22DEC-Strongest-Friendship-Group-G/P8905-USACO22DEC-Strongest-Friendship-Group-G/index.html","cc3b1de99e6621d9f42d2a4719b46a95"],["/undefined/P9019-USACO23JAN-Tractor-Paths-P/P9019-USACO23JAN-Tractor-Paths-P/index.html","780885aa9fefe9b6047acede31b9553c"],["/undefined/P9378-THUPC-2023-决赛-物理实验/P9378-THUPC-2023-决赛-物理实验/index.html","28f94a42468ea0b1ad8d98945deab35f"],["/undefined/P9437-『XYGOI-round1』一棵树/P9437-『XYGOI-round1』一棵树/index.html","40a0bce876b3522081c2379c7f16848a"],["/undefined/P9715-「QFOI-R1」头/P9715-「QFOI-R1」头/index.html","387721b833a9004175942cbd6ee1896b"],["/undefined/P9745-「KDOI-06-S」树上异或/P9745-「KDOI-06-S」树上异或/index.html","e6db2dae7ca77a80efae44e42a255417"],["/undefined/P9753-CSP-S-2023-消消乐/P9753-CSP-S-2023-消消乐/index.html","dc546a8648d74fa1b07cbe8d8298c51b"],["/undefined/Solve/Solve/index.html","cd4417310281caff1c98009c065c7c79"],["/undefined/Tarjan-圆方树/Tarjan-圆方树/index.html","de89e8f2adaadc752adb5145c6d6fc93"],["/undefined/Vivia-主题相关/Vivia-主题相关/index.html","769a2675f19c498b37809d42f54f6b13"],["/undefined/cdq-分治/cdq-分治/index.html","8c5c98c4b30a40e1b7d5b45a3bc1b8f0"],["/undefined/hello-world/hello-world/index.html","16676bec8e228a94b33025bab8a78be6"],["/undefined/三分/三分/index.html","68a90e6d830780ce46fcae642234f426"],["/undefined/串串进阶/串串进阶/index.html","880c2e339887cf2f19eb39b114ba6912"],["/undefined/写于NOIP之后/写于NOIP之后/index.html","aa7cea6d51d17a67ceaa66240e4816c7"],["/undefined/分治进阶/分治进阶/index.html","bd5b66a461342c5e300a29708532d2d0"],["/undefined/可持久化并查集/可持久化并查集/index.html","2eefccd60234b96017083fd9d6c904c1"],["/undefined/启发式合并/启发式合并/index.html","bb062cedee8ade2e63c508b1b1d63051"],["/undefined/基环树-Dp/基环树-Dp/index.html","90dcd7442b3091691b2d1425202fcc67"],["/undefined/多项式全家桶/多项式全家桶/index.html","d131bd1ae361de2782ce16695331e3c0"],["/undefined/定义/定义/index.html","577f934b2571e9be1fe2ef76708b7e8c"],["/undefined/平衡树进阶操作/平衡树进阶操作/index.html","6e8f2268e7039d66a3567e0e0d186e1d"],["/undefined/建站ing/建站ing/index.html","4556d4b44d3d48150d423aef15f7542a"],["/undefined/数论进阶/数论进阶/index.html","541ef08fe39fd760e234196377fb486b"],["/undefined/斜率优化-Dp/斜率优化-Dp/index.html","2d00288da5cc45eaa776f27b7f5d83fe"],["/undefined/最大流/最大流/index.html","af13583895e30ed56fe8f9fedec7e397"],["/undefined/最小割/最小割/index.html","298833d8fe4128d4ac774b6c5217956d"],["/undefined/最小割树/最小割树/index.html","88f618b2514d8525689d12ae5a13ce5f"],["/undefined/杂题精选-Nov-1-Wildest-Dreams/杂题精选-Nov-1-Wildest-Dreams/index.html","0390aa4631850c31528922404c141c2e"],["/undefined/杂题精选-Oct-1-The-best-People-in-life-are-free/杂题精选-Oct-1-The-best-People-in-life-are-free/index.html","44c00fcfa1172afc4b0362df9eb1fac3"],["/undefined/杂题精选-Oct-2-数据结构萌萌题/杂题精选-Oct-2-数据结构萌萌题/index.html","2dbd6f9f4e2f01f3d90381d049724224"],["/undefined/树/树/index.html","204f9caa8c610c6e2a8d6b51445a1161"],["/undefined/树上启发式合并/树上启发式合并/index.html","a11c99929192871c07c1ed3ea9302b1f"],["/undefined/树剖/树剖/index.html","b7474f4effd6e08fbdf5db883a1474b1"],["/undefined/树套树/树套树/index.html","85cdf5aed8c3d34fdfabc3a4a18c91c0"],["/undefined/概率期望/概率期望/index.html","bacf464558a53f4f9e7249489e52f3ca"],["/undefined/浅谈分治/浅谈分治/index.html","ccb230cd470996cf576171fc6ea2afde"],["/undefined/浅谈前后缀思想/浅谈前后缀思想/index.html","639659ca7630e50a6c862ddd67677156"],["/undefined/浅谈单调序列绝对值和最小化/浅谈单调序列绝对值和最小化/index.html","5df4d6eaa5c510d8c31d21b0013c2485"],["/undefined/浅谈博弈论/浅谈博弈论/index.html","59683db0bea86d4cf2fcd519456c1ede"],["/undefined/浅谈字符串/浅谈字符串/index.html","6e4c3845d9b32d4857f9904e22e95e5d"],["/undefined/浅谈随机化/浅谈随机化/index.html","6546c82ba213c5157662780b762c847f"],["/undefined/浅谈随机堆/浅谈随机堆/index.html","b5226264ac3d49a6ec5f220ec5c4942d"],["/undefined/浅谈集合选数前-k-大/浅谈集合选数前-k-大/index.html","0fe3fdf9fb4be5c7a9b8f5023d91e065"],["/undefined/珂朵莉树/珂朵莉树/index.html","c447e059749bf732676b52b053d3ca62"],["/undefined/省选模拟赛补题/省选模拟赛补题/index.html","403ea5d2869cc13724f3043d7f8c45b6"],["/undefined/线性代数/线性代数/index.html","f3272e619d14b7abc85e76b76b65e719"],["/undefined/线性基/线性基/index.html","10787aa86b909f40a5e9587158322afc"],["/undefined/组合数学/组合数学/index.html","765b0d0a36ce53435e080454df3cee3d"],["/undefined/网络流/网络流/index.html","3e5a645f7ce15250f0b7e77c7157c26d"],["/undefined/网络流复建/网络流复建/index.html","50cf54005880bdcb9a5e1441ffafd848"],["/undefined/莫队进阶/莫队进阶/index.html","95f5f0306d03d5018eae3f410350111c"],["/undefined/虚树/虚树/index.html","ab278d71a7fc57192f682fd9eda417c9"],["/undefined/费用流/费用流/index.html","f30a4dc1468d886fe10d406c2796a31c"],["/undefined/连续段-Dp/连续段-Dp/index.html","5ffb7b9bee648f3fa9b00fabb7bddc4b"],["/undefined/长链剖分/长链剖分/index.html","222cf1bed1d867e80054a9c42f0820fe"],["/undefined/高联23一试T8T11妙解/高联23一试T8T11妙解/index.html","b0f8e7ee042eba75c95956379ca712bd"],["/undefined/鲜花-1/鲜花-1/index.html","4f10b21fa30d4ebb72fcdac8c1cfb559"],["/webfonts/fa-brands-400.ttf","2f73c22e9ab02b8f923c9577fb267e3c"],["/webfonts/fa-duotone-900.ttf","5043107ed7dba7b22fea520507ffcbfa"],["/webfonts/fa-light-300.ttf","56720c95107daf1fc8c4e3efbde50d44"],["/webfonts/fa-regular-400.ttf","fba93793e177af4a2277e468db6e409f"],["/webfonts/fa-sharp-solid-900.ttf","258a4bbc66f0b3e34c28b4026816ec72"],["/webfonts/fa-solid-900.ttf","7b93722a98b0178b89cad243a020f45c"],["/webfonts/fa-thin-100.ttf","eedf47e45505ceb0798e86e80856a246"],["/webfonts/fa-v4compatibility.ttf","69ecd6a58b5b719735db6f4fbce1d48d"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');
var firstRegister = 1; // 默认1是首次安装SW， 0是SW更新


var ignoreUrlParametersMatching = [/^utm_/];


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var cleanResponse = function (originalResponse) {
    // 如果没有重定向响应，不需干啥
    if (!originalResponse.redirected) {
        return Promise.resolve(originalResponse);
    }

    // Firefox 50 及以下不知处 Response.body 流, 所以我们需要读取整个body以blob形式返回。
    var bodyPromise = 'body' in originalResponse ?
        Promise.resolve(originalResponse.body) :
        originalResponse.blob();

    return bodyPromise.then(function (body) {
        // new Response() 可同时支持 stream or Blob.
        return new Response(body, {
            headers: originalResponse.headers,
            status: originalResponse.status,
            statusText: originalResponse.statusText
        });
    });
};

var createCacheKey = function (originalUrl, paramName, paramValue,
    dontCacheBustUrlsMatching) {

    // 创建一个新的URL对象，避免影响原始URL
    var url = new URL(originalUrl);

    // 如果 dontCacheBustUrlsMatching 值没有设置，或是没有匹配到，将值拼接到url.serach后
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
        url.search += (url.search ? '&' : '') +
            encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
};

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // 如果 whitelist 是空数组，则认为全部都在白名单内
    if (whitelist.length === 0) {
        return true;
    }

    // 否则逐个匹配正则匹配并返回
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function (whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // 移除 hash; 查看 https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // 是否包含 '?'
        .split('&') // 分割成数组 'key=value' 的形式
        .map(function (kv) {
            return kv.split('='); // 分割每个 'key=value' 字符串成 [key, value] 形式
        })
        .filter(function (kv) {
            return ignoreUrlParametersMatching.every(function (ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // 如果 key 没有匹配到任何忽略参数正则，就 Return true
            });
        })
        .map(function (kv) {
            return kv.join('='); // 重新把 [key, value] 格式转换为 'key=value' 字符串
        })
        .join('&'); // 将所有参数 'key=value' 以 '&' 拼接

    return url.toString();
};


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
    precacheConfig.map(function (item) {
        var relativeUrl = item[0];
        var hash = item[1];
        var absoluteUrl = new URL(relativeUrl, self.location);
        var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
        return [absoluteUrl.toString(), cacheKey];
    })
);

function setOfCachedUrls(cache) {
    return cache.keys().then(function (requests) {
        // 如果原cacheName中没有缓存任何收，就默认是首次安装，否则认为是SW更新
        if (requests && requests.length > 0) {
            firstRegister = 0; // SW更新
        }
        return requests.map(function (request) {
            return request.url;
        });
    }).then(function (urls) {
        return new Set(urls);
    });
}

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return setOfCachedUrls(cache).then(function (cachedUrls) {
                return Promise.all(
                    Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
                        // 如果缓存中没有匹配到cacheKey，添加进去
                        if (!cachedUrls.has(cacheKey)) {
                            var request = new Request(cacheKey, { credentials: 'same-origin' });
                            return fetch(request).then(function (response) {
                                // 只要返回200才能继续，否则直接抛错
                                if (!response.ok) {
                                    throw new Error('Request for ' + cacheKey + ' returned a ' +
                                        'response with status ' + response.status);
                                }

                                return cleanResponse(response).then(function (responseToCache) {
                                    return cache.put(cacheKey, responseToCache);
                                });
                            });
                        }
                    })
                );
            });
        })
            .then(function () {
            
            // 强制 SW 状态 installing -> activate
            return self.skipWaiting();
            
        })
    );
});

self.addEventListener('activate', function (event) {
    var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.keys().then(function (existingRequests) {
                return Promise.all(
                    existingRequests.map(function (existingRequest) {
                        // 删除原缓存中相同键值内容
                        if (!setOfExpectedUrls.has(existingRequest.url)) {
                            return cache.delete(existingRequest);
                        }
                    })
                );
            });
        }).then(function () {
            
            return self.clients.claim();
            
        }).then(function () {
                // 如果是首次安装 SW 时, 不发送更新消息（是否是首次安装，通过指定cacheName 中是否有缓存信息判断）
                // 如果不是首次安装，则是内容有更新，需要通知页面重载更新
                if (!firstRegister) {
                    return self.clients.matchAll()
                        .then(function (clients) {
                            if (clients && clients.length) {
                                clients.forEach(function (client) {
                                    client.postMessage('sw.update');
                                })
                            }
                        })
                }
            })
    );
});



    self.addEventListener('fetch', function (event) {
        if (event.request.method === 'GET') {

            // 是否应该 event.respondWith()，需要我们逐步的判断
            // 而且也方便了后期做特殊的特殊
            var shouldRespond;


            // 首先去除已配置的忽略参数及hash
            // 查看缓存简直中是否包含该请求，包含就将shouldRespond 设为true
            var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
            shouldRespond = urlsToCacheKeys.has(url);

            // 如果 shouldRespond 是 false, 我们在url后默认增加 'index.html'
            // (或者是你在配置文件中自行配置的 directoryIndex 参数值)，继续查找缓存列表
            var directoryIndex = 'index.html';
            if (!shouldRespond && directoryIndex) {
                url = addDirectoryIndex(url, directoryIndex);
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 仍是 false，检查是否是navigation
            // request， 如果是的话，判断是否能与 navigateFallbackWhitelist 正则列表匹配
            var navigateFallback = '';
            if (!shouldRespond &&
                navigateFallback &&
                (event.request.mode === 'navigate') &&
                isPathWhitelisted([], event.request.url)
            ) {
                url = new URL(navigateFallback, self.location).toString();
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 被置为 true
            // 则 event.respondWith()匹配缓存返回结果，匹配不成就直接请求.
            if (shouldRespond) {
                event.respondWith(
                    caches.open(cacheName).then(function (cache) {
                        return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
                            if (response) {
                                return response;
                            }
                            throw Error('The cached response that was expected is missing.');
                        });
                    }).catch(function (e) {
                        // 如果捕获到异常错误，直接返回 fetch() 请求资源
                        console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
                        return fetch(event.request);
                    })
                );
            }
        }
    });









/* eslint-enable */
