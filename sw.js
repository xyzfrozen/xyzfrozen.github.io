/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/404.html","94d14ce8ae292136f686766e397c5379"],["/about/index.html","c74a5203a07951c44ab46f9f0af62398"],["/archives/2023/09/index.html","48227fef645d68196968f059424c50ab"],["/archives/2023/10/index.html","559258f1588e18cd3058b50ce829e590"],["/archives/2023/11/index.html","9751c85b240f65af46e1621f5226aceb"],["/archives/2023/12/index.html","d5cdbd3709f76a4d7374061e6aaac63d"],["/archives/2023/index.html","e95d7bfaa030206fe35ec959e07db2bc"],["/archives/2024/01/index.html","93355123ed68c42233d20205a38d602c"],["/archives/2024/02/index.html","f817b69f78d1168598456b9f29da6f76"],["/archives/2024/03/index.html","ca59107e2c87c6d12bfd5025332b6ce0"],["/archives/2024/index.html","a6fd7f3c6e18c350fb336ef245e85bd7"],["/archives/index.html","acf0f99037de95f8784c6dea2f737506"],["/assets/hbe.style.css","c94ef63e0056de67b35bf1385cd23136"],["/assets/odometer-theme-minimal.css","d50a198c326f1767cdaecdb7c67b392d"],["/categories/ideas/index.html","e9400a77c406fcad83545705a12678a7"],["/categories/index.html","b74ae7b8b832b1c6005013f57e26a07f"],["/categories/math/index.html","4591f2a8862fd2b350e9166d4707ed07"],["/categories/note/index.html","3dcbb577c25fe78d679652c5ab3b1df4"],["/categories/note/page/2/index.html","f668c5b49b1a34f81dc4eb5345b4ee6f"],["/categories/note/page/3/index.html","d459daf17bbea9bb297a92913d345843"],["/categories/note/page/4/index.html","687592ff2b76da0afec5c3e561e34a9d"],["/categories/note/page/5/index.html","b07c01deaa49c6f83f32e7551a563332"],["/categories/note/page/6/index.html","292d32985fcb658f3df7440cb8298248"],["/categories/note/problem/index.html","880cb6b97403a21cb2d64e50bfd03ea6"],["/categories/problem/index.html","d3ea4a7a325565d4c30be6ee5e1bee8c"],["/categories/problem/page/2/index.html","ff8058e2d3ef75d9beeadbef2e1579fc"],["/categories/problem/page/3/index.html","482e5cfeabf70b922c011ce355226312"],["/categories/problem/page/4/index.html","1f5789130bfa80146b7fd89e182b9aac"],["/categories/problem/page/5/index.html","91616dbc9fe014e37f5095bf302aa0e3"],["/categories/problem/page/6/index.html","5f80bbf742a98b6c5ab4df241364ab1a"],["/categories/technology/index.html","127ce28a6bb73058520837e30d6a9cbb"],["/categories/杂谈/index.html","f23310429a2321a1a7dd1cf4e9455482"],["/categories/碎碎念/index.html","aa2135c2dd0fcd9985ac546d649a16c1"],["/categories/碎碎念/杂谈/index.html","3265cb74065826cc34d7b417679da793"],["/css/build/tailwind.css","261b7db66d0d5faf466f0ece1f35c521"],["/css/common/animated.css","fe6a847ca2005f6fb57d9398238e9a54"],["/css/common/basic.css","fd62a91b87e0b1e3bcb57b61626da45e"],["/css/common/codeblock/code-block.css","d68e4692e9dc2c71925a95cefa1b0de6"],["/css/common/codeblock/code-theme.css","bf37e0ef3feb3bcf800ec1b85497ee20"],["/css/common/codeblock/highlight.css","1ff6250bc0b511e2a2bf3ac75ade9d6d"],["/css/common/codeblock/hljs-themes/dark/a11y-dark.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/common/codeblock/hljs-themes/dark/agate.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/common/codeblock/hljs-themes/dark/atom-one-dark.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/common/codeblock/hljs-themes/dark/github-dark.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/common/codeblock/hljs-themes/dark/monokai-sublime.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/common/codeblock/hljs-themes/dark/night-owl.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/common/codeblock/hljs-themes/dark/nord.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/common/codeblock/hljs-themes/dark/tokyo-night-dark.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/common/codeblock/hljs-themes/dark/vs2015.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/common/codeblock/hljs-themes/light/atom-one-light.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/common/codeblock/hljs-themes/light/default.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/common/codeblock/hljs-themes/light/github.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/common/colors.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/common/markdown.css","2a2119e88d52e6295958c3da377fcd40"],["/css/common/redefine-theme.css","d8544efaa7d55a398eb06e40da897972"],["/css/common/theme.css","7d27625866a5d0d4dfd89b3bb2531293"],["/css/common/variables.css","7d27625866a5d0d4dfd89b3bb2531293"],["/css/hbe.style.css","c94ef63e0056de67b35bf1385cd23136"],["/css/layout/animations.css","311ce912e8802bab1a0ebf9b93a6cdf7"],["/css/layout/archive-content.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/layout/article-content.css","a748b99e0e63f8fc153a8615d53ad10b"],["/css/layout/bookmarks.css","3c667fbba24db5d57f3b36948bcb2294"],["/css/layout/category-content.css","8504891f74bfa1079b890810b9e2c254"],["/css/layout/category-list.css","f2b671e851e9e2f3ad9297507fae7be7"],["/css/layout/home-content.css","00e8d947b261d3098c6f26b21c9d1ae3"],["/css/layout/home-sidebar.css","1414c33188dcf7efbfdb96e52ab9e1c3"],["/css/layout/page.css","b4ef69f5ad07d9ecd6d2d024e7cc7d9d"],["/css/layout/tag-content.css","27d71fb45d5e3b7fc7bacda0d95439cc"],["/css/style.css","6326938ff972c480c282eceb02aa5c21"],["/css/tailwind.source.css","06afc733511db98d7f6286ad50d7d900"],["/fontawesome/all.min.css","9ec513d705ed7f4deb2b50bb05914817"],["/fontawesome/brands.min.css","40960f6969b87896c9889de920787ae8"],["/fontawesome/duotone.min.css","6d17219d846a2851c2ed490a62dd38cb"],["/fontawesome/fontawesome.min.css","7f252c83010f3cada47ee6a6f71d1ee8"],["/fontawesome/light.min.css","99d663cdb4567e9c0c000fc52c670fb8"],["/fontawesome/regular.min.css","020abce5e17082f0f18f92aed092c0b0"],["/fontawesome/sharp-solid.min.css","20abfb823fecc8a6a73458c5edd394f9"],["/fontawesome/solid.min.css","f484f18056587df321165f744e9ba571"],["/fontawesome/svg-with-js.min.css","c40530bda390deaaed914c49f34d9e1e"],["/fontawesome/thin.min.css","f44cae780bf8a7287221c340cbe4d815"],["/fontawesome/v4-font-face.min.css","52325430f1fa7f983a32f712ebb59b3a"],["/fontawesome/v4-shims.min.css","4d764578be067a44af663d56be333195"],["/fontawesome/v5-font-face.min.css","1cb7f16555da63aecd2828d3d3130d85"],["/fonts/Chillax/Chillax-Variable.eot","f8ea7af333c768147f674ba526612248"],["/fonts/Chillax/Chillax-Variable.ttf","5f13274ffe3e1ee77b67324cb1a9cf7c"],["/fonts/Chillax/Chillax-Variable.woff","16fee1e0f2e5db01ad15ce4535ad39e2"],["/fonts/Chillax/chillax.css","d13c26a95b1aee7d8aded06da0cb5098"],["/fonts/Geist/GeistVF.ttf","8e8ae89cf243d3d79b7404594c4bc9fb"],["/fonts/Geist/GeistVF.woff","78e6fc13ea317b55ab0bd6dc4849c110"],["/fonts/Geist/geist.css","df305236468a27e647c5c7fa4b792beb"],["/fonts/GeistMono/GeistMonoVF.ttf","56335c91c8b94afe39dbdedea3edc556"],["/fonts/GeistMono/GeistMonoVF.woff","cbeb6d2d96eaa268b4b5beb0b46d9632"],["/fonts/GeistMono/geist-mono.css","a3af8ec2f57297db3069a40aed8b6f3b"],["/image/Violet 1.jpg","eb023ca433bc1de215c0a0d15fd1d616"],["/image/author.jpg","44d0486db9384c602d929f1ec2f519f9"],["/images/bookmark-placeholder.svg","8454460d32d133132a25fdd204aedd23"],["/images/loading.svg","e1de41eda143447d3b338e77f7ace18f"],["/images/redefine-avatar.svg","fd210fedbfe357f35c570f61b943481b"],["/images/redefine-favicon.svg","badc8db1a4c3d1845db4e4ffec333d9e"],["/images/redefine-logo.svg","80a88fff4a3bb50559543e80477aa571"],["/index.html","d325a53058f7b0d94c9e86ce927cb155"],["/js/build.js","5341ed036111d1d383f762a7b16eecf8"],["/js/build/layouts/bookmarkNav.js","097c740771b97344144a1cf3ca6b7cb4"],["/js/build/layouts/categoryList.js","673fa565e09cd2644b1a08c1c3abfdbd"],["/js/build/layouts/essays.js","3c88c5302443df628aeb46bdd6914d7f"],["/js/build/layouts/lazyload.js","c59e15c4337d23ad2646299a09ff90f2"],["/js/build/layouts/navbarShrink.js","f75267c3fc787b128dfb677c02b473f6"],["/js/build/layouts/toc.js","614442ba11f44702efbce3a90de33215"],["/js/build/libs/APlayer.min.js","8f1017e7a73737e631ff95fa51e4e7d7"],["/js/build/libs/Swup.min.js","9ff02a08a69fe4addbd9af33359deabf"],["/js/build/libs/SwupPreloadPlugin.min.js","170c2637b152f61a7225171523b9e5f3"],["/js/build/libs/SwupProgressPlugin.min.js","f9eb5c6b192ac1dcd18b12666a647fd0"],["/js/build/libs/SwupScriptsPlugin.min.js","30935c9aeeb587c49d2e30c28f57c5e7"],["/js/build/libs/SwupScrollPlugin.min.js","85fe68c41c48170dd104ee4f29690798"],["/js/build/libs/SwupSlideTheme.min.js","2b1d521e1b83b5ffc073ad31045e682a"],["/js/build/libs/Typed.min.js","f68641147185cbded4b38b4900a20f40"],["/js/build/libs/anime.min.js","864a144dbbc956381a47679ec57ab06c"],["/js/build/libs/minimasonry.min.js","a3b6453136c8edd4fdd374171f022ffa"],["/js/build/libs/moment-with-locales.min.js","ef33ee2255d562260ac4adcabf2c768c"],["/js/build/libs/moment.min.js","d65dc6d2e619406d105656424573214e"],["/js/build/libs/odometer.min.js","519a5777444f5965b6df23e26c69f037"],["/js/build/libs/pangu.min.js","56d77fdebf0e7828a3b3b12cc1efbc63"],["/js/build/libs/pjax.min.js","d810aff16a7f45392bdeec5493ebee8e"],["/js/build/main.js","787e716c7a4ec70b6b394a1619281da5"],["/js/build/plugins/aplayer.js","4cd807821e617050a3c77eb7eb728a93"],["/js/build/plugins/hbe.js","5446cb6b73c9c8da42312095b1161e1d"],["/js/build/plugins/masonry.js","a4b9fb8c6cb7ce9bb8187b5438376ab1"],["/js/build/plugins/mermaid.js","bce96327a8d2e7fd7a5b430c7bed69df"],["/js/build/plugins/pangu.js","e03e7c22bdcf1f5aacf77dad6e6c846e"],["/js/build/plugins/tabs.js","086c9e50583c09df54d60180363ed6cb"],["/js/build/plugins/typed.js","2467827048201706a308a217e8b90aff"],["/js/build/tools/codeBlock.js","297268558dc208c26aabce4e26153e8a"],["/js/build/tools/imageViewer.js","6bb5ba2c5e073a57dc6e3d9d018b8004"],["/js/build/tools/lightDarkSwitch.js","ec6d8d01a5626cf64b9c4bffcb7484f8"],["/js/build/tools/localSearch.js","065eaaded82588d34e706aa87ee3700c"],["/js/build/tools/runtime.js","f95b6bf310ef3002ba2e6ef64864523f"],["/js/build/tools/scrollTopBottom.js","dd5dfa8ced3205a6c733e2050cd076a1"],["/js/build/tools/tocToggle.js","1068e4d69d57bd1d2ef7ef75ce22e507"],["/js/build/utils.js","5580c42253a88d876f8419ea4809ecfd"],["/js/layouts/bookmarkNav.js","09fea9b55003c3d61f70b9451d2fa00a"],["/js/layouts/categoryList.js","be8705c55bfaa476c5cf3fd995409305"],["/js/layouts/essays.js","b9d423957d9d298bb6ea35afb8ee4968"],["/js/layouts/lazyload.js","728031a7240822da29d5bd927d1e1727"],["/js/layouts/navbarShrink.js","3903c793ce2bb9cabaf86d3df90c8d97"],["/js/layouts/toc.js","cb98abb318dc0eda4bac6ec6d43faf10"],["/js/libs/APlayer.min.js","8f1017e7a73737e631ff95fa51e4e7d7"],["/js/libs/Swup.min.js","9ff02a08a69fe4addbd9af33359deabf"],["/js/libs/SwupPreloadPlugin.min.js","170c2637b152f61a7225171523b9e5f3"],["/js/libs/SwupProgressPlugin.min.js","f9eb5c6b192ac1dcd18b12666a647fd0"],["/js/libs/SwupScriptsPlugin.min.js","30935c9aeeb587c49d2e30c28f57c5e7"],["/js/libs/SwupScrollPlugin.min.js","85fe68c41c48170dd104ee4f29690798"],["/js/libs/SwupSlideTheme.min.js","2b1d521e1b83b5ffc073ad31045e682a"],["/js/libs/Typed.min.js","f68641147185cbded4b38b4900a20f40"],["/js/libs/anime.min.js","864a144dbbc956381a47679ec57ab06c"],["/js/libs/minimasonry.min.js","a3b6453136c8edd4fdd374171f022ffa"],["/js/libs/moment-with-locales.min.js","ef33ee2255d562260ac4adcabf2c768c"],["/js/libs/moment.min.js","d65dc6d2e619406d105656424573214e"],["/js/libs/odometer.min.js","519a5777444f5965b6df23e26c69f037"],["/js/libs/pangu.min.js","56d77fdebf0e7828a3b3b12cc1efbc63"],["/js/libs/pjax.min.js","d810aff16a7f45392bdeec5493ebee8e"],["/js/main.js","180d14891eeced743d6383e29bd4d18d"],["/js/plugins/aplayer.js","a6799589abf3d648505e019be3bda342"],["/js/plugins/hbe.js","57bf317ca01bf1b91ff63a4296b784b2"],["/js/plugins/masonry.js","5bc974b941304732db8c9fcc1e6e7c9c"],["/js/plugins/mermaid.js","929a9284ea999064bc6842d28bf9f102"],["/js/plugins/pangu.js","ae0c52a8f357d18a3d1e2a0bba1b6ead"],["/js/plugins/tabs.js","a6eca0aaba3fd4a5cb8539b129d742cf"],["/js/plugins/typed.js","23bc47b11d76324398c35807e27153a8"],["/js/tools/codeBlock.js","187983273eb159f9fab0f4bb8d4d02c3"],["/js/tools/imageViewer.js","a27482679a509643f70fe8047308215d"],["/js/tools/lightDarkSwitch.js","ab6260f82f3916594294df5ff3e86c94"],["/js/tools/localSearch.js","d9ecf11b97c82251978084566e399426"],["/js/tools/runtime.js","87f27761db6f7a197f99739804ee0c1d"],["/js/tools/scrollTopBottom.js","d984b4612439ba4d47813e1dd1bf46f2"],["/js/tools/tocToggle.js","3f9682b1c2890c79ae186762f257cd16"],["/js/utils.js","52ec7231d017b70103218e523cdd97a9"],["/page/10/index.html","6ba177e29c5597266a8ac72fed643147"],["/page/11/index.html","b130d1c3b6c7af4dd4d13101bdd6f444"],["/page/12/index.html","2c6a00618c363c6c4f8990e68aa7ba23"],["/page/2/index.html","fdca2530bac3f6008b3e52dbe28380c9"],["/page/3/index.html","0015c8e0e8ac359671326d98e90b7571"],["/page/4/index.html","d49dfcae16a37e76af975b634403dd2f"],["/page/5/index.html","bf4fa341ae8b2910ba3588828f3124cd"],["/page/6/index.html","fd153e6eac930b9018e659cb40c35221"],["/page/7/index.html","dd57b4c8f178635cf9678a6f91f0a3e0"],["/page/8/index.html","5343f21ae8f02441377270eba6dfa91a"],["/page/9/index.html","eecb1b043f37db68e44e39ffc4dfcfe5"],["/sw-register.js","79febf3bcef7695f806c71657e1107be"],["/tags/2-SAt/index.html","39baf58324ce82873232554feb31d1cd"],["/tags/AC自动机/index.html","d150090509dff8bcb2918bd5ecc6d485"],["/tags/DFA/index.html","b7ebad7b69f0ced729db764eae82d4be"],["/tags/Exkmp/index.html","357ea49fe3082cf88cbff0f038222ddc"],["/tags/Fhq/index.html","665018cfc806c586eb38927b7d27d7a1"],["/tags/Hash/index.html","1cebab80f84d241374e6154991496f00"],["/tags/IDA/index.html","e637db26a4759d7f9a03bb8884ed3fc8"],["/tags/KD-Tree/index.html","3266fcaca62cb115f19c9fcb0f0c3aa9"],["/tags/KMP/index.html","5a8e7c8fee387675f0ceea9eee587c67"],["/tags/Kru-重构树/index.html","659494508e804cfdf9e6f741eb39aa90"],["/tags/Kru重构树/index.html","25c4db65f9c8c2c9b24d4835387b302d"],["/tags/LCA/index.html","019d9a15b79de45bf51b008b5bb43d6a"],["/tags/LCP/index.html","555b2002609141f18d85ffcfec0b9519"],["/tags/MST/index.html","f4d332a804ac9fde6d5997bc835ec173"],["/tags/Tarjan/index.html","8bdd7f9b98153dee09e2ee73ca84baf1"],["/tags/Topsort/index.html","2812117f3418dde422c89dd60a02ed14"],["/tags/Trie/index.html","a47e8478cf1df6820dcb79f2e6b73651"],["/tags/cdq分治/index.html","6bad4bb7197e834ef66aa24b801febd2"],["/tags/index.html","f7da8f80dd6f67e750ae0349fbfafe96"],["/tags/manacher/index.html","38c9e5c07d3aa944e283331149ef7bf5"],["/tags/math/index.html","9b64a21d6ab6265557106f2cded256dd"],["/tags/三分/index.html","3e88079e7a53b6f7d8e93184c3cb8f9a"],["/tags/二分/index.html","c8869faf6cc8adbc0d10e89880bcaa22"],["/tags/二分图/index.html","0306b3894515160e0270fbd8b400d53f"],["/tags/二维数点/index.html","568e5fabee186a348077d2fe438b31ad"],["/tags/众数/index.html","6d42d63f6a306153b1d97702e0599fd9"],["/tags/倍增/index.html","b7e68b9cfcdaad7054eedfda1fe30221"],["/tags/偏序/index.html","b7f45b4a81b79da50f8e9d2395229be4"],["/tags/分块/index.html","ddd90288c1f5794f9a0f1c42892ad5d5"],["/tags/分治/index.html","4b3f6d7f445be658cad3d08c2fde81a9"],["/tags/前缀和/index.html","970bed78110bd5433d49441c61134940"],["/tags/动态开点/index.html","63d17ab8d72349b2f99f6bf52bfd3660"],["/tags/动态开点权值线段树/index.html","09fc381b9655def3c39be77a99a4cc69"],["/tags/区间-Dp/index.html","f4016c4175e9051e2f2e9f09dff91cc6"],["/tags/博弈论/index.html","a8e1717f41d56082cbc5787e7c9ef953"],["/tags/双指针/index.html","a7a07b97d8dcfee0f5ff6c21b79f7bf7"],["/tags/双端队列/index.html","048e41ee22cc06d3a0b175b98250a4d6"],["/tags/可持久化/index.html","db7d1b9305d3893a8fda3ec69394fe52"],["/tags/可持久化平衡树/index.html","2ed543740e61b07eb41ca0f93a39bb11"],["/tags/可持久化并查集/index.html","bb7ec66d9d94fae9594f403bf65ae123"],["/tags/可持久化线段树/index.html","487873e74182aa41dddbb9b4bada4359"],["/tags/可撤销并查集/index.html","131930e07998e2b3bd7265f9ea49dc53"],["/tags/后缀数组/index.html","cbc710484e29aec6494009f90f85b749"],["/tags/后缀自动机/index.html","01d0e88d91bd567d4deded302f3ba24c"],["/tags/启发式合并/index.html","dc4c8783345be56283c027d4c6409c50"],["/tags/回文自动机/index.html","a2f01db619b1ec75f13d5da534171401"],["/tags/回滚莫队/index.html","bcd7dea4f3b6d2697f5c23b573427e91"],["/tags/图论/index.html","40d136de2dda3ab62a3856a9eae68a2f"],["/tags/圆方树/index.html","561939268fd457725afa2c07662ecf57"],["/tags/均摊分析/index.html","bc3ac37c6ddf360653c3b64b32703700"],["/tags/基环树/index.html","07fc76452ae0b2f6419b71cf60fe12d4"],["/tags/堆/index.html","d5c5aab113c7cf62d640aac7dbc60930"],["/tags/复杂度分析/index.html","f6f0013bdc3fa46458f6d8119614a3a5"],["/tags/复杂度均摊/index.html","91877356203e3b7035d8ec50f02e0550"],["/tags/多元处理/index.html","65597f512916f00373f046b15fd6bcf7"],["/tags/多项式算法/index.html","fd27a11d0b6d517df6c0bd4341d14057"],["/tags/字符串/index.html","57270332ed934f16a7267667fe2f4740"],["/tags/容斥/index.html","32485c7af4a3dbf35eef43f9015cbc7a"],["/tags/容斥原理/index.html","242dccd869e1a3ad449bf29b923c7caf"],["/tags/对顶栈/index.html","1838b65649951cc9fa7a72712dfd3ec5"],["/tags/导数/index.html","83682ae5d5502531b311f0f34d196b69"],["/tags/带修莫队/index.html","452c1597500089dd4c467753f147e05c"],["/tags/平衡树/index.html","d4ce0672a9b90b5b36eb9226b4a8ce28"],["/tags/并查集/index.html","ba16636521180808ce751b146e950b35"],["/tags/序列自动机/index.html","59fc29b26f3840b582c21116f680311d"],["/tags/归并排序/index.html","1747d497424d7555f8789ecc87803546"],["/tags/待修ST表/index.html","723b3c7fe1c8a5ec15cc407107c82f5d"],["/tags/循环节/index.html","89d545776a4249f66afa441b2f8a67bf"],["/tags/思维/index.html","0364370f391353a32261ba316581b106"],["/tags/思维/page/2/index.html","661b74cc1fef70cc637d0a3d3fb75244"],["/tags/思维/page/3/index.html","495bc35725d2115b7004ee17cc4a3ad1"],["/tags/拉格朗日插值/index.html","adcac2a0d940e1eaa6df1990cc5207a5"],["/tags/换根-Dp/index.html","381b276315dd3cb9fa6529782b326c37"],["/tags/搜索/index.html","526ca46d1c2c9f043f094e366346ce7b"],["/tags/数学/index.html","040804b95d245c954fa2d3ee9a046899"],["/tags/数学/page/2/index.html","e5dcfbdb1293ce3afa3d1f0c3e7b7383"],["/tags/数据结构/index.html","c771bc7161ac9db2a026ace53552c8cb"],["/tags/数论/index.html","2e396912cafbe8bf685d613145634235"],["/tags/整体二分/index.html","3651f6dd651bd8b79c02ec6cf86d5c78"],["/tags/整除分块/index.html","db9bd08ebb12f248472eaf5ddeeccf5c"],["/tags/斜率优化-Dp/index.html","4d9407aab36e228fb45d6dd1547b0045"],["/tags/最大流/index.html","1bfe4f3b2c7a6f754a0bf2153150d3de"],["/tags/最小割/index.html","a3bdc3a7b3b4cce42f6158c473a6a63b"],["/tags/最小割树/index.html","e1f008dd7d030b8a239ea6d710005873"],["/tags/最小生成树/index.html","1eba9c223506704b06892a76e23dc41c"],["/tags/最短路/index.html","8742321665e6f3d0474328540280f3cf"],["/tags/期望/index.html","282971201477f1ee18a06224556f9151"],["/tags/杂谈/index.html","827a1fd83502baad7a531a1c685a051e"],["/tags/权值线段树/index.html","8d0a96d2996150a3f6e940d64782ec54"],["/tags/栈/index.html","1305ff269a41a9ab2df66535da31e823"],["/tags/树上莫队/index.html","ca1a2157f6f1b8abb2eb34877ac34d51"],["/tags/树剖/index.html","3bd77eed18057b23e9ff36c371169cea"],["/tags/树套树/index.html","bc5ec520dda30b1926cc81a734356d71"],["/tags/树形-Dp/index.html","a689d666abf1da96e3e8f5418bea5aef"],["/tags/树形-Dp/page/2/index.html","3410cf18ae6c81a884a8d2362303949b"],["/tags/树状数组/index.html","a21597a907eb97c838ff2515461a282b"],["/tags/根号分治/index.html","65c850ab467bb6b33b72d2ecd9e6fa59"],["/tags/概率/index.html","ae65e63de316d0ecff676b8c353d8470"],["/tags/状压-Dp/index.html","3b53d6c4628eead714b9a53640368cdf"],["/tags/状态压缩/index.html","19a099fdbfe345dba26507788a8fbe3c"],["/tags/珂朵莉树/index.html","193de09b2a5c35b639408765a86abf4f"],["/tags/矩阵/index.html","7ca20865ef02ff8b7cadd19db339b0cd"],["/tags/碰撞/index.html","75f702cd40316dc20c3e909bed4c2e6e"],["/tags/线性-Dp/index.html","f56a6255b90d75b21e124eaa8199efdd"],["/tags/线性-Dp/page/2/index.html","1c210b8023f0474b4d8028d242e4cfa2"],["/tags/线性基/index.html","21401a21c9aed927f5cd2d4eaa8ee6d2"],["/tags/线段树/index.html","84cffece38f62e2c18ea73564e3013aa"],["/tags/线段树/page/2/index.html","00a645898f68c903ee319fbf260e9271"],["/tags/线段树二分/index.html","ceb13395ec87ae0db62eddae373b7469"],["/tags/线段树合并/index.html","9a4d91b57a816d5352a2bd173b37cfec"],["/tags/组合数学/index.html","3aaec2d748066307bb1edfe4a782f923"],["/tags/网络流/index.html","373c3f1f6820814ca40d91143a6aef5a"],["/tags/置换环/index.html","5a6bf8402507b5ad7cb8eea57d4b38ba"],["/tags/莫比乌斯反演/index.html","fc3cda021ce63ceac501b06111d3e25a"],["/tags/莫队/index.html","ce6315e823bde4c0ccfba8c21c2b4587"],["/tags/虚树/index.html","d5e806f47c74533e4c33177f81ce61ba"],["/tags/贪心/index.html","efc82d6c39d7d7c6b29c834521d7cd52"],["/tags/费用流/index.html","23e1120d0e928397bf837f2f1b913a5c"],["/tags/轮廓线-Dp/index.html","e6b3394ea8a06177eb8428405c692128"],["/tags/连续段-Dp/index.html","6d81fc069757d2ef7112818b63263dc5"],["/tags/逆序对/index.html","a6313b20b2f9e13a454c0dd00442f3fe"],["/tags/长链剖分/index.html","9b0c2d19297b336e3e8e479a90a3d492"],["/tags/随机化/index.html","3108e53863efaaedf78ad30298b11660"],["/tags/高斯消元/index.html","c5eb664b1a3ec345bc372ba78532f5a2"],["/undefined/2-SAT/2-SAT/index.html","42cbfdbc05be8f3920a3c73aa836e4da"],["/undefined/23总结/23总结/index.html","443b510df92cb5af93abf0d20eb4e8fd"],["/undefined/ABC248-F/ABC248-F/index.html","0cd2cba6254540a857ac2b57c7d80de8"],["/undefined/ABC277-G/ABC277-G/index.html","a8835edf934f6a702e1b7f9feb33210b"],["/undefined/AT-dp-y/AT-dp-y/index.html","be1b2919793fbfc01668a44cb32a2287"],["/undefined/Boruvka/Boruvka/index.html","9e551b595c29c23fd032b297ffd22656"],["/undefined/CF1876/CF1876/index.html","fc681067567d57d85c5eb816cccf8856"],["/undefined/CF27E-Number-With-The-Given-Amount-Of-Divisors/CF27E-Number-With-The-Given-Amount-Of-Divisors/index.html","18ab543222da14a60a284119a879d98b"],["/undefined/CF708C-Centroids/CF708C-Centroids/index.html","af50d52aa73225d3ee841225560ba835"],["/undefined/DFA-全家桶/DFA-全家桶/index.html","cd66d2814ca6c69428221ee01a4ded9b"],["/undefined/Dfn序-欧拉序/Dfn序-欧拉序/index.html","c7afb17d8e8f807df24481087b5ecf2b"],["/undefined/EXSTL-Pbds/EXSTL-Pbds/index.html","33ad62fc8c95160645053c3739fb5268"],["/undefined/EXSTL-Rope/EXSTL-Rope/index.html","f4d1e9c8e0ebf3d76aa52df4608f07d1"],["/undefined/Extra-树状数组/Extra-树状数组/index.html","210454b202a73b6300a8fc375eec99ea"],["/undefined/Extra-线段树-优化建图/Extra-线段树-优化建图/index.html","c939dfa6f58ead75e582fe9395241825"],["/undefined/Extra-线段树-动态开点 && 权值线段树/Extra-线段树-动态开点 && 权值线段树/index.html","975e841895ef41f8e2c726f6a6a7deba"],["/undefined/Extra-线段树-线段树分治/Extra-线段树-线段树分治/index.html","dbd69d51f28fd0227f1fd6b978bdcbe2"],["/undefined/Extra-线段树-线段树合并/Extra-线段树-线段树合并/index.html","4d6d0775c9ead95dd2591d948d7d1d03"],["/undefined/Hash/Hash/index.html","5598ac0592ffecb952ce6ca83ccd366b"],["/undefined/IDA-拯救世界/IDA-拯救世界/index.html","ffc490cea11b4945b50becd02d404368"],["/undefined/KD-Tree/KD-Tree/index.html","06e0209e0d76ddac03f62bbab174bb74"],["/undefined/Kru重构树/Kru重构树/index.html","003f806e3074bca977f1c4763ce3029a"],["/undefined/Last-Season-1-CSP/Last-Season-1-CSP/index.html","2d90fd03df6a19d2fbf27cbefb7f4d7e"],["/undefined/Luogu-Simu10/Luogu-Simu10/index.html","dd5d09db9d7352f8b191f202759ed8fb"],["/undefined/Luogu-Simu4-T1/Luogu-Simu4-T1/index.html","ef9267c40305100201ad2c156f2c3e84"],["/undefined/Luogu-Simu4-T2/Luogu-Simu4-T2/index.html","a6c6bf0728187f009025056632bc2c33"],["/undefined/Luogu-Simu5-T1/Luogu-Simu5-T1/index.html","5a33d80b8b0519b9ea3b7bb2f33a4942"],["/undefined/Luogu-Simu5-T3/Luogu-Simu5-T3/index.html","e1a6365da12fdfecf4d1211e0c4c96e5"],["/undefined/Luogu-Simu5-T4/Luogu-Simu5-T4/index.html","4806bf64856ca589cb43144e3a9cd4ae"],["/undefined/Luogu-Simu6-T1/Luogu-Simu6-T1/index.html","1dcb524a9019451a50d7d79956d45271"],["/undefined/Luogu-Simu6-T2/Luogu-Simu6-T2/index.html","02b271381ab0c20657764fb86ab9f529"],["/undefined/Luogu-Simu6-T3/Luogu-Simu6-T3/index.html","0898b99cf7a6463741fbe32f13f48ac3"],["/undefined/Luogu-Simu7-T3/Luogu-Simu7-T3/index.html","b84008d1c5456ea9878dcff45c92da4c"],["/undefined/Luogu-Simu7-T4/Luogu-Simu7-T4/index.html","e947f4305449bb7cdbce11ecb88ade6b"],["/undefined/Luogu-Simu8-T1/Luogu-Simu8-T1/index.html","7148f9aa16c7ac92b60dc7581439665c"],["/undefined/Luogu-Simu9-T2/Luogu-Simu9-T2/index.html","28300c060c943cf534582e327b1dfaf1"],["/undefined/P2150-NOI2015-寿司晚宴 & P8292 [省选联考 2022] 卡牌/P2150-NOI2015-寿司晚宴/index.html","18dbe59e3d688e333bf0dae169bf27e0"],["/undefined/P2157-SDOI2009-学校食堂/P2157-SDOI2009-学校食堂/index.html","e61f3bfa1e92cde358c7a58eb647173e"],["/undefined/P2331-SCOI2005-最大子矩阵/P2331-SCOI2005-最大子矩阵/index.html","fd481e1b998443fc183d01f1be95bfb2"],["/undefined/P3253-JLOI2013-删除物品/P3253-JLOI2013-删除物品/index.html","e1b0c2308c4c06119994b5e6b36c3dfe"],["/undefined/P3551-POI2013-USU-Take-ou/P3551-POI2013-USU-Take-ou/index.html","3d1413d7a8fc6a71b335da389aa33072"],["/undefined/P3668-USACO17OPEN-Modern-Art-2-G/P3668-USACO17OPEN-Modern-Art-2-G/index.html","92bc73f7c9ae666091a14d627761d776"],["/undefined/P4824-USACO15FEB-Censoring-S/P4824-USACO15FEB-Censoring-S/index.html","059d5fe5b961fbd362cb0360d84ea7ba"],["/undefined/P4940-Portal2/P4940-Portal2/index.html","3b4cf32b288de1d3403a0fb3d933d770"],["/undefined/P5426-USACO19OPEN-Balancing-Inversions-G/P5426-USACO19OPEN-Balancing-Inversions-G/index.html","22c8f4edff66dbee97e9998396c782aa"],["/undefined/P5522-yLOI2019-棠梨煎雪/P5522-yLOI2019-棠梨煎雪/index.html","1222695a05841a23ff30d807d2956a67"],["/undefined/P5835-USACO19DEC-Meetings-S/P5835-USACO19DEC-Meetings-S/index.html","c9dd5cdc8e90ab49ec8570751f7d7d7c"],["/undefined/P5978-CEOI2018-Global-warming/P5978-CEOI2018-Global-warming/index.html","30719a5b50fb0a609ffedc2a8824d8ce"],["/undefined/P6064-USACO05JAN-Naptime-G/P6064-USACO05JAN-Naptime-G/index.html","b38ced772c44a5e5dca549dc42ef459b"],["/undefined/P6148-USACO20FEB-Swapity-Swapity-Swap-S/P6148-USACO20FEB-Swapity-Swapity-Swap-S/index.html","171c76531f96388e10ba644d96e7f1c4"],["/undefined/P6381-『MdOI-R2』Odyssey/P6381-『MdOI-R2』Odyssey/index.html","6f72c333305ed6fce332048667f03e61"],["/undefined/P7077-CSP-S2020-函数调用/P7077-CSP-S2020-函数调用/index.html","7653c79517b516cdca6ef43fa140a00b"],["/undefined/P7108-移花接木/P7108-移花接木/index.html","15dea9c4270b6df25460bb0f108e4756"],["/undefined/P7249-BalticOI-2012-Day1-移动网络/P7249-BalticOI-2012-Day1-移动网络/index.html","d3f438af8da89996b84a83ee0f98a067"],["/undefined/P7291-「EZEC-5」人赢-加强版/P7291-「EZEC-5」人赢-加强版/index.html","3f58e13ef7f764088df2f993acb24628"],["/undefined/P7355-「PMOI-1」抽奖/P7355-「PMOI-1」抽奖/index.html","107869b7857362fa6e4dbf398a5e8db8"],["/undefined/P7789-COCI2016-2017-6-Sirni/P7789-COCI2016-2017-6-Sirni/index.html","87df7833a6dd27f565949bd0c90aba5d"],["/undefined/P7811-JRKSJ-R2-你的名字。/P7811-JRKSJ-R2-你的名字。/index.html","92c01723608815cc3fb453675cc933a6"],["/undefined/P7915-CSP-S-2021-回文/P7915-CSP-S-2021-回文/index.html","681f7d26a126d336a37ea8196531886c"],["/undefined/P8252-NOI-Online-2022-提高组-讨论/P8252-NOI-Online-2022-提高组-讨论/index.html","463e69235d606c547631c9552b2a0ea9"],["/undefined/P8365-LNOI2022-吃/P8365-LNOI2022-吃/index.html","97dbe265e5f57cd7dd8bdb345877520b"],["/undefined/P8817-CSP-S-2022-假期计划/P8817-CSP-S-2022-假期计划/index.html","0cb7983d22fc82f3e3d05bd815132686"],["/undefined/P8905-USACO22DEC-Strongest-Friendship-Group-G/P8905-USACO22DEC-Strongest-Friendship-Group-G/index.html","6ee27864f98a5102893a626c187f91dc"],["/undefined/P9019-USACO23JAN-Tractor-Paths-P/P9019-USACO23JAN-Tractor-Paths-P/index.html","28ee69071566a1de6acf664d64902eb9"],["/undefined/P9378-THUPC-2023-决赛-物理实验/P9378-THUPC-2023-决赛-物理实验/index.html","f9662d56006fb1088af84337c813ec3d"],["/undefined/P9437-『XYGOI-round1』一棵树/P9437-『XYGOI-round1』一棵树/index.html","288aa309a828015b54ff5b7c84b9a494"],["/undefined/P9715-「QFOI-R1」头/P9715-「QFOI-R1」头/index.html","dee333f9377f180b7f79aeb903340c07"],["/undefined/P9745-「KDOI-06-S」树上异或/P9745-「KDOI-06-S」树上异或/index.html","b991c8d64bdf16b84f41340cef309464"],["/undefined/P9753-CSP-S-2023-消消乐/P9753-CSP-S-2023-消消乐/index.html","1aa71160e325a4c4d6034ddaf23886b9"],["/undefined/Solve/Solve/index.html","e8fdd10224317f1a438fb18304564f60"],["/undefined/Tarjan-圆方树/Tarjan-圆方树/index.html","8f091a0e5ca63527a1d822f25d82b58d"],["/undefined/Vivia-主题相关/Vivia-主题相关/index.html","2e2c3863dd50eeaa5a1d87963932f320"],["/undefined/cdq-分治/cdq-分治/index.html","c1c441a678369677f7a787b08a8117ca"],["/undefined/hello-world/hello-world/index.html","5b449adce87d6952f51a9f6b1c3d1fcb"],["/undefined/三分/三分/index.html","42b3adf16b0a77634f80e7c67143361b"],["/undefined/串串进阶/串串进阶/index.html","b316a775710ae011e8fabe9e4d98d775"],["/undefined/写于NOIP之后/写于NOIP之后/index.html","24a34f3fa8906a65caecffccc2f7e07d"],["/undefined/分治进阶/分治进阶/index.html","166e7629d875ad6915c78b6586ea937d"],["/undefined/可持久化并查集/可持久化并查集/index.html","36fb66ae9d4963e41fe7d8071cfd6c77"],["/undefined/启发式合并/启发式合并/index.html","3a2d0e8bad04a381c932d7420f456ca9"],["/undefined/基环树-Dp/基环树-Dp/index.html","75e3d27242adeefee5befc66ae72ad73"],["/undefined/多项式全家桶/多项式全家桶/index.html","56b7643997cae6a94e852af4284c74f0"],["/undefined/定义/定义/index.html","9c2421d666dccc99077a337ecb601262"],["/undefined/平衡树进阶操作/平衡树进阶操作/index.html","15a0f19f29190fc1b06db718ed0fe4f7"],["/undefined/建站ing/建站ing/index.html","9c728b3dff4e6a7cc1d4b0fd88154d4b"],["/undefined/数论进阶/数论进阶/index.html","cf12adbb96b774c12f769f120cbda261"],["/undefined/斜率优化-Dp/斜率优化-Dp/index.html","9beba2f8172b80a631c0e8248d361f95"],["/undefined/最大流/最大流/index.html","ad7b352431169b7e2d42cbc7eac2183b"],["/undefined/最小割/最小割/index.html","e618ea3b421a8e2921f09889add7fba6"],["/undefined/最小割树/最小割树/index.html","c972b88b77804ca79243e23594dae149"],["/undefined/杂题精选-Nov-1-Wildest-Dreams/杂题精选-Nov-1-Wildest-Dreams/index.html","74cdf00321fc96cca99f608d72ecf4d3"],["/undefined/杂题精选-Oct-1-The-best-People-in-life-are-free/杂题精选-Oct-1-The-best-People-in-life-are-free/index.html","7e818df5adc14d0618131cc771de842b"],["/undefined/杂题精选-Oct-2-数据结构萌萌题/杂题精选-Oct-2-数据结构萌萌题/index.html","4c4dbed143723f8feb85c410f5db1675"],["/undefined/树/树/index.html","c5f5eab8cb0d91320856266b1b7099e7"],["/undefined/树上启发式合并/树上启发式合并/index.html","f11b85892f94d0b2ecaac99bac80013d"],["/undefined/树剖/树剖/index.html","5c1f5140f956b3c15ba67e6d5b6d821a"],["/undefined/树套树/树套树/index.html","e2c0aef32bef96c71d5e0ecd1902e2df"],["/undefined/概率期望/概率期望/index.html","ae538f7041a043cec70b33b419f5b959"],["/undefined/浅谈分治/浅谈分治/index.html","e8f2322865de499571a9caeab5cd6852"],["/undefined/浅谈前后缀思想/浅谈前后缀思想/index.html","40fb4cfa4c8c196e6ce59d92124b59ee"],["/undefined/浅谈单调序列绝对值和最小化/浅谈单调序列绝对值和最小化/index.html","e6bde87a5baea4ab1aea5984bd6272b1"],["/undefined/浅谈博弈论/浅谈博弈论/index.html","ff7b6e47845e96b457235b8c7a3194f7"],["/undefined/浅谈字符串/浅谈字符串/index.html","30b78436b2082b2191a48c070a4b65f3"],["/undefined/浅谈随机化/浅谈随机化/index.html","907bed261247cff0591cc929e0b9376f"],["/undefined/浅谈随机堆/浅谈随机堆/index.html","2ddaa5a07c66fe6f6d4534daa8b4edcf"],["/undefined/浅谈集合选数前-k-大/浅谈集合选数前-k-大/index.html","c5fea7cf82ac8cb22ffc791dff61b091"],["/undefined/珂朵莉树/珂朵莉树/index.html","af8743821c9454c44e89b10be005bc65"],["/undefined/省选模拟赛补题/省选模拟赛补题/index.html","9789d8479d18d6c15528bff85fc0a982"],["/undefined/线性代数/线性代数/index.html","6c2e2b7da0970c34ce69feb4fe0f4057"],["/undefined/线性基/线性基/index.html","f50dc83adb8b2a24a4d01acd52721daa"],["/undefined/组合数学/组合数学/index.html","65cf5d1ef51fbd9e5b253d486622df75"],["/undefined/网络流/网络流/index.html","f9b8cf00dc505b701c9f718362192488"],["/undefined/网络流复建/网络流复建/index.html","7c8e2e978799b24f055ed14117049e04"],["/undefined/莫队进阶/莫队进阶/index.html","b1e48c191fd64f9c0f73667c3c0b6ba8"],["/undefined/虚树/虚树/index.html","e867bbc6c45017dd4865782f35e1d41d"],["/undefined/费用流/费用流/index.html","5f425afa848c7fa899c0bc9682294f95"],["/undefined/连续段-Dp/连续段-Dp/index.html","685a7189fe0b31a1d9b5cdc6f2e41030"],["/undefined/长链剖分/长链剖分/index.html","14e628587492a7ec5aab951a585729dd"],["/undefined/高联23一试T8T11妙解/高联23一试T8T11妙解/index.html","83ddaf9be8824e130eb4cd5c9b1dd928"],["/undefined/鲜花-1/鲜花-1/index.html","4d831977f72c89743c855974b2466862"],["/webfonts/fa-brands-400.ttf","2f73c22e9ab02b8f923c9577fb267e3c"],["/webfonts/fa-duotone-900.ttf","5043107ed7dba7b22fea520507ffcbfa"],["/webfonts/fa-light-300.ttf","56720c95107daf1fc8c4e3efbde50d44"],["/webfonts/fa-regular-400.ttf","fba93793e177af4a2277e468db6e409f"],["/webfonts/fa-sharp-solid-900.ttf","258a4bbc66f0b3e34c28b4026816ec72"],["/webfonts/fa-solid-900.ttf","7b93722a98b0178b89cad243a020f45c"],["/webfonts/fa-thin-100.ttf","eedf47e45505ceb0798e86e80856a246"],["/webfonts/fa-v4compatibility.ttf","69ecd6a58b5b719735db6f4fbce1d48d"]];
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
