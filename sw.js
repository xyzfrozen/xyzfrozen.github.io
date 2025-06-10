/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/404.html","688884f0dd7814ba7f82820a18497337"],["/about/index.html","7fa2bf6d261af4d0647712b4111246de"],["/archives/2023/09/index.html","d6dc779d30f27d94d1f896e8091a358a"],["/archives/2023/10/index.html","fbb09a96130dac6c6a20890053ed4095"],["/archives/2023/11/index.html","6ba76a00ac6f5536334186d6fa301085"],["/archives/2023/12/index.html","a32c8b09f650d8947e9a28a2d31656f9"],["/archives/2023/index.html","a9ee5f427978e3c684d9cccfad6e3271"],["/archives/2024/01/index.html","62290746f6a3a28065b691f69416fb0a"],["/archives/2024/02/index.html","38f2db284fd7aaf5f145daf5d85b6029"],["/archives/2024/03/index.html","16e694254f5dffca05a43978475ed5d4"],["/archives/2024/index.html","c9b6844b856e1a697b44c6d37589ae52"],["/archives/index.html","4057d7252421416798909d32b2deb35f"],["/assets/hbe.style.css","c94ef63e0056de67b35bf1385cd23136"],["/assets/odometer-theme-minimal.css","d50a198c326f1767cdaecdb7c67b392d"],["/categories/ideas/index.html","812eac9b0a78c8a343882ccb75040d20"],["/categories/index.html","5e457f8d845c4cb5be9ea3c774109c41"],["/categories/math/index.html","655abc9e08c22302da38ff9a29eda8e3"],["/categories/note/index.html","09748ff74a7c4a4910659f3a19d6061d"],["/categories/note/page/2/index.html","825ff6ecee5720d9f01746c7645e3f74"],["/categories/note/page/3/index.html","b09656f761157bf647efcb036b7dbcb7"],["/categories/note/page/4/index.html","9fceb1dead25f42d05ad68ce1c86667d"],["/categories/note/page/5/index.html","e0e3567ceca12cf64f66f662d395023f"],["/categories/note/page/6/index.html","fbdb2c7241788d7a860f31a230cc09d8"],["/categories/note/problem/index.html","d7c4e9330d8dba44c492c6f9e860d5ee"],["/categories/problem/index.html","70e239ba7bb8f00d40fab45edc6dd87a"],["/categories/problem/page/2/index.html","fb2c5684a341943bc9088c26fb00e928"],["/categories/problem/page/3/index.html","0ebff8470263233f6c801eb69e0a5a43"],["/categories/problem/page/4/index.html","47c51bd29b6282e36984a7b57650f7df"],["/categories/problem/page/5/index.html","f4c1ea37551bb2e7e54f79dcadf2f1be"],["/categories/problem/page/6/index.html","8b43819185006bd4598eb428f730b286"],["/categories/technology/index.html","6097b2e80aadd3660341be55a5b48b2f"],["/categories/杂谈/index.html","c1e85949202aa7808d0dff28ab813604"],["/categories/碎碎念/index.html","9a6e5adcfa1785978a1c58a522b72422"],["/categories/碎碎念/杂谈/index.html","4e5ac02b7b886903e93738b34122e8d3"],["/css/build/tailwind.css","261b7db66d0d5faf466f0ece1f35c521"],["/css/common/animated.css","fe6a847ca2005f6fb57d9398238e9a54"],["/css/common/basic.css","fd62a91b87e0b1e3bcb57b61626da45e"],["/css/common/codeblock/code-block.css","d68e4692e9dc2c71925a95cefa1b0de6"],["/css/common/codeblock/code-theme.css","bf37e0ef3feb3bcf800ec1b85497ee20"],["/css/common/codeblock/highlight.css","1ff6250bc0b511e2a2bf3ac75ade9d6d"],["/css/common/codeblock/hljs-themes/dark/a11y-dark.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/common/codeblock/hljs-themes/dark/agate.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/common/codeblock/hljs-themes/dark/atom-one-dark.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/common/codeblock/hljs-themes/dark/github-dark.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/common/codeblock/hljs-themes/dark/monokai-sublime.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/common/codeblock/hljs-themes/dark/night-owl.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/common/codeblock/hljs-themes/dark/nord.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/common/codeblock/hljs-themes/dark/tokyo-night-dark.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/common/codeblock/hljs-themes/dark/vs2015.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/common/codeblock/hljs-themes/light/atom-one-light.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/common/codeblock/hljs-themes/light/default.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/common/codeblock/hljs-themes/light/github.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/common/colors.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/common/markdown.css","2a2119e88d52e6295958c3da377fcd40"],["/css/common/redefine-theme.css","d8544efaa7d55a398eb06e40da897972"],["/css/common/theme.css","7d27625866a5d0d4dfd89b3bb2531293"],["/css/common/variables.css","7d27625866a5d0d4dfd89b3bb2531293"],["/css/hbe.style.css","c94ef63e0056de67b35bf1385cd23136"],["/css/layout/animations.css","311ce912e8802bab1a0ebf9b93a6cdf7"],["/css/layout/archive-content.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/layout/article-content.css","a748b99e0e63f8fc153a8615d53ad10b"],["/css/layout/bookmarks.css","3c667fbba24db5d57f3b36948bcb2294"],["/css/layout/category-content.css","8504891f74bfa1079b890810b9e2c254"],["/css/layout/category-list.css","f2b671e851e9e2f3ad9297507fae7be7"],["/css/layout/home-content.css","00e8d947b261d3098c6f26b21c9d1ae3"],["/css/layout/home-sidebar.css","1414c33188dcf7efbfdb96e52ab9e1c3"],["/css/layout/page.css","b4ef69f5ad07d9ecd6d2d024e7cc7d9d"],["/css/layout/tag-content.css","27d71fb45d5e3b7fc7bacda0d95439cc"],["/css/style.css","6326938ff972c480c282eceb02aa5c21"],["/css/tailwind.source.css","06afc733511db98d7f6286ad50d7d900"],["/fontawesome/all.min.css","9ec513d705ed7f4deb2b50bb05914817"],["/fontawesome/brands.min.css","40960f6969b87896c9889de920787ae8"],["/fontawesome/duotone.min.css","6d17219d846a2851c2ed490a62dd38cb"],["/fontawesome/fontawesome.min.css","7f252c83010f3cada47ee6a6f71d1ee8"],["/fontawesome/light.min.css","99d663cdb4567e9c0c000fc52c670fb8"],["/fontawesome/regular.min.css","020abce5e17082f0f18f92aed092c0b0"],["/fontawesome/sharp-solid.min.css","20abfb823fecc8a6a73458c5edd394f9"],["/fontawesome/solid.min.css","f484f18056587df321165f744e9ba571"],["/fontawesome/svg-with-js.min.css","c40530bda390deaaed914c49f34d9e1e"],["/fontawesome/thin.min.css","f44cae780bf8a7287221c340cbe4d815"],["/fontawesome/v4-font-face.min.css","52325430f1fa7f983a32f712ebb59b3a"],["/fontawesome/v4-shims.min.css","4d764578be067a44af663d56be333195"],["/fontawesome/v5-font-face.min.css","1cb7f16555da63aecd2828d3d3130d85"],["/fonts/Chillax/Chillax-Variable.eot","f8ea7af333c768147f674ba526612248"],["/fonts/Chillax/Chillax-Variable.ttf","5f13274ffe3e1ee77b67324cb1a9cf7c"],["/fonts/Chillax/Chillax-Variable.woff","16fee1e0f2e5db01ad15ce4535ad39e2"],["/fonts/Chillax/chillax.css","d13c26a95b1aee7d8aded06da0cb5098"],["/fonts/Geist/GeistVF.ttf","8e8ae89cf243d3d79b7404594c4bc9fb"],["/fonts/Geist/GeistVF.woff","78e6fc13ea317b55ab0bd6dc4849c110"],["/fonts/Geist/geist.css","df305236468a27e647c5c7fa4b792beb"],["/fonts/GeistMono/GeistMonoVF.ttf","56335c91c8b94afe39dbdedea3edc556"],["/fonts/GeistMono/GeistMonoVF.woff","cbeb6d2d96eaa268b4b5beb0b46d9632"],["/fonts/GeistMono/geist-mono.css","a3af8ec2f57297db3069a40aed8b6f3b"],["/image/Violet 1.jpg","eb023ca433bc1de215c0a0d15fd1d616"],["/image/author.jpg","44d0486db9384c602d929f1ec2f519f9"],["/images/bookmark-placeholder.svg","8454460d32d133132a25fdd204aedd23"],["/images/loading.svg","e1de41eda143447d3b338e77f7ace18f"],["/images/redefine-avatar.svg","fd210fedbfe357f35c570f61b943481b"],["/images/redefine-favicon.svg","badc8db1a4c3d1845db4e4ffec333d9e"],["/images/redefine-logo.svg","80a88fff4a3bb50559543e80477aa571"],["/index.html","63ba75dfc3011d4c3fba85b585d29b45"],["/js/build.js","5341ed036111d1d383f762a7b16eecf8"],["/js/build/layouts/bookmarkNav.js","097c740771b97344144a1cf3ca6b7cb4"],["/js/build/layouts/categoryList.js","673fa565e09cd2644b1a08c1c3abfdbd"],["/js/build/layouts/essays.js","3c88c5302443df628aeb46bdd6914d7f"],["/js/build/layouts/lazyload.js","c59e15c4337d23ad2646299a09ff90f2"],["/js/build/layouts/navbarShrink.js","f75267c3fc787b128dfb677c02b473f6"],["/js/build/layouts/toc.js","614442ba11f44702efbce3a90de33215"],["/js/build/libs/APlayer.min.js","8f1017e7a73737e631ff95fa51e4e7d7"],["/js/build/libs/Swup.min.js","9ff02a08a69fe4addbd9af33359deabf"],["/js/build/libs/SwupPreloadPlugin.min.js","170c2637b152f61a7225171523b9e5f3"],["/js/build/libs/SwupProgressPlugin.min.js","f9eb5c6b192ac1dcd18b12666a647fd0"],["/js/build/libs/SwupScriptsPlugin.min.js","30935c9aeeb587c49d2e30c28f57c5e7"],["/js/build/libs/SwupScrollPlugin.min.js","85fe68c41c48170dd104ee4f29690798"],["/js/build/libs/SwupSlideTheme.min.js","2b1d521e1b83b5ffc073ad31045e682a"],["/js/build/libs/Typed.min.js","f68641147185cbded4b38b4900a20f40"],["/js/build/libs/anime.min.js","864a144dbbc956381a47679ec57ab06c"],["/js/build/libs/minimasonry.min.js","a3b6453136c8edd4fdd374171f022ffa"],["/js/build/libs/moment-with-locales.min.js","ef33ee2255d562260ac4adcabf2c768c"],["/js/build/libs/moment.min.js","d65dc6d2e619406d105656424573214e"],["/js/build/libs/odometer.min.js","519a5777444f5965b6df23e26c69f037"],["/js/build/libs/pangu.min.js","56d77fdebf0e7828a3b3b12cc1efbc63"],["/js/build/libs/pjax.min.js","d810aff16a7f45392bdeec5493ebee8e"],["/js/build/main.js","787e716c7a4ec70b6b394a1619281da5"],["/js/build/plugins/aplayer.js","4cd807821e617050a3c77eb7eb728a93"],["/js/build/plugins/hbe.js","5446cb6b73c9c8da42312095b1161e1d"],["/js/build/plugins/masonry.js","a4b9fb8c6cb7ce9bb8187b5438376ab1"],["/js/build/plugins/mermaid.js","bce96327a8d2e7fd7a5b430c7bed69df"],["/js/build/plugins/pangu.js","e03e7c22bdcf1f5aacf77dad6e6c846e"],["/js/build/plugins/tabs.js","086c9e50583c09df54d60180363ed6cb"],["/js/build/plugins/typed.js","2467827048201706a308a217e8b90aff"],["/js/build/tools/codeBlock.js","297268558dc208c26aabce4e26153e8a"],["/js/build/tools/imageViewer.js","6bb5ba2c5e073a57dc6e3d9d018b8004"],["/js/build/tools/lightDarkSwitch.js","ec6d8d01a5626cf64b9c4bffcb7484f8"],["/js/build/tools/localSearch.js","065eaaded82588d34e706aa87ee3700c"],["/js/build/tools/runtime.js","f95b6bf310ef3002ba2e6ef64864523f"],["/js/build/tools/scrollTopBottom.js","dd5dfa8ced3205a6c733e2050cd076a1"],["/js/build/tools/tocToggle.js","1068e4d69d57bd1d2ef7ef75ce22e507"],["/js/build/utils.js","5580c42253a88d876f8419ea4809ecfd"],["/js/layouts/bookmarkNav.js","09fea9b55003c3d61f70b9451d2fa00a"],["/js/layouts/categoryList.js","be8705c55bfaa476c5cf3fd995409305"],["/js/layouts/essays.js","b9d423957d9d298bb6ea35afb8ee4968"],["/js/layouts/lazyload.js","728031a7240822da29d5bd927d1e1727"],["/js/layouts/navbarShrink.js","3903c793ce2bb9cabaf86d3df90c8d97"],["/js/layouts/toc.js","cb98abb318dc0eda4bac6ec6d43faf10"],["/js/libs/APlayer.min.js","8f1017e7a73737e631ff95fa51e4e7d7"],["/js/libs/Swup.min.js","9ff02a08a69fe4addbd9af33359deabf"],["/js/libs/SwupPreloadPlugin.min.js","170c2637b152f61a7225171523b9e5f3"],["/js/libs/SwupProgressPlugin.min.js","f9eb5c6b192ac1dcd18b12666a647fd0"],["/js/libs/SwupScriptsPlugin.min.js","30935c9aeeb587c49d2e30c28f57c5e7"],["/js/libs/SwupScrollPlugin.min.js","85fe68c41c48170dd104ee4f29690798"],["/js/libs/SwupSlideTheme.min.js","2b1d521e1b83b5ffc073ad31045e682a"],["/js/libs/Typed.min.js","f68641147185cbded4b38b4900a20f40"],["/js/libs/anime.min.js","864a144dbbc956381a47679ec57ab06c"],["/js/libs/minimasonry.min.js","a3b6453136c8edd4fdd374171f022ffa"],["/js/libs/moment-with-locales.min.js","ef33ee2255d562260ac4adcabf2c768c"],["/js/libs/moment.min.js","d65dc6d2e619406d105656424573214e"],["/js/libs/odometer.min.js","519a5777444f5965b6df23e26c69f037"],["/js/libs/pangu.min.js","56d77fdebf0e7828a3b3b12cc1efbc63"],["/js/libs/pjax.min.js","d810aff16a7f45392bdeec5493ebee8e"],["/js/main.js","180d14891eeced743d6383e29bd4d18d"],["/js/plugins/aplayer.js","a6799589abf3d648505e019be3bda342"],["/js/plugins/hbe.js","57bf317ca01bf1b91ff63a4296b784b2"],["/js/plugins/masonry.js","5bc974b941304732db8c9fcc1e6e7c9c"],["/js/plugins/mermaid.js","929a9284ea999064bc6842d28bf9f102"],["/js/plugins/pangu.js","ae0c52a8f357d18a3d1e2a0bba1b6ead"],["/js/plugins/tabs.js","a6eca0aaba3fd4a5cb8539b129d742cf"],["/js/plugins/typed.js","23bc47b11d76324398c35807e27153a8"],["/js/tools/codeBlock.js","187983273eb159f9fab0f4bb8d4d02c3"],["/js/tools/imageViewer.js","a27482679a509643f70fe8047308215d"],["/js/tools/lightDarkSwitch.js","ab6260f82f3916594294df5ff3e86c94"],["/js/tools/localSearch.js","d9ecf11b97c82251978084566e399426"],["/js/tools/runtime.js","87f27761db6f7a197f99739804ee0c1d"],["/js/tools/scrollTopBottom.js","d984b4612439ba4d47813e1dd1bf46f2"],["/js/tools/tocToggle.js","3f9682b1c2890c79ae186762f257cd16"],["/js/utils.js","52ec7231d017b70103218e523cdd97a9"],["/page/10/index.html","a8910b411e7c11c6f527e23c26522ed2"],["/page/11/index.html","513eb1184d31139ed14b4e0b7c136290"],["/page/12/index.html","458423cede20adeec208426de448cd32"],["/page/2/index.html","02096ac755355e063637c45ea467ddc9"],["/page/3/index.html","c990c5a3153e4a662dfd6606733c10da"],["/page/4/index.html","9155bc6d04ed9fe3b61e09b7dc71733b"],["/page/5/index.html","c4ed88cdcc43c45c371e85cc949597cc"],["/page/6/index.html","e0cf5190c018488b72a3046e9fd2a9f3"],["/page/7/index.html","ac2683e361b4ea350eb8f8b28d4388d5"],["/page/8/index.html","1522dfcd4402d7df33e424cbc0ea017e"],["/page/9/index.html","8fa898329ce249a7cca2d7589ff5238d"],["/sw-register.js","946470a9d4984e19eac4af4c8e73da26"],["/tags/2-SAt/index.html","7b7a99db68356bb9ea7c731680ec28ec"],["/tags/AC自动机/index.html","1a1fa72fe51fc510ade62d3c2cb2ae01"],["/tags/DFA/index.html","36e1d219c0862f82e336630ec1d98f04"],["/tags/Exkmp/index.html","06ad304b426a5a8e01a34bba03f3f6fc"],["/tags/Fhq/index.html","e5f4830156619628b725e3a3540bce87"],["/tags/Hash/index.html","cc56b70d699fdae14204859af4759edb"],["/tags/IDA/index.html","428a30d758306b5090a21fba47fdc88f"],["/tags/KD-Tree/index.html","c1c77463d635e4bf11d2a90e312844b1"],["/tags/KMP/index.html","764d629b1b714068ae15dca67d42e04a"],["/tags/Kru-重构树/index.html","974dff74536120aa6b99d1b5f5670c7e"],["/tags/Kru重构树/index.html","7c5b32764aff8abf90e242c29a601f23"],["/tags/LCA/index.html","7c7288d0fa5d794944756811ecbdecf4"],["/tags/LCP/index.html","3a5ed3926fb68505a3f966b7e185d6e0"],["/tags/MST/index.html","375603e2d8ac4919e6d679ee7ed2b2bf"],["/tags/Tarjan/index.html","3b66f21ccc7bd8f2379ccc878428c192"],["/tags/Topsort/index.html","ad25cad10c39429f9403638f54e4507a"],["/tags/Trie/index.html","80bd00787939ffa5b238a1015d1c0c5e"],["/tags/cdq分治/index.html","65a8566dba5f717431f57e131ebd72af"],["/tags/index.html","0ba9178835fcc01f341156fd75d2612d"],["/tags/manacher/index.html","d9e04e65c1419251606f233fa6982a24"],["/tags/math/index.html","08a2c471469ec5556a801d9d8e958bf5"],["/tags/三分/index.html","e55ec87bfdfda5722e57b6093fcd89d1"],["/tags/二分/index.html","606e3a9a0bc41a75b565293e1a0beabc"],["/tags/二分图/index.html","0d413c23980c453b5502afd533ae75c2"],["/tags/二维数点/index.html","e2b98cbdc6393842cce47e2f5f16ee79"],["/tags/众数/index.html","e6cafb8b984bc31744cae24aff03d2f0"],["/tags/倍增/index.html","47e96725a96daa2c233905e1eec28760"],["/tags/偏序/index.html","bdccc9321fc7523e58df2fe79d5927ac"],["/tags/分块/index.html","032079948e91d28a2077aafc1a44c4ee"],["/tags/分治/index.html","f0849f982311e74a9ca1e2828bd0573c"],["/tags/前缀和/index.html","2d27600b3e8ff24c6e1dd76c0b301831"],["/tags/动态开点/index.html","0e9ece57c42f743fa10474372d28cd55"],["/tags/动态开点权值线段树/index.html","01bd0403fdc3902eadcd78c802281d99"],["/tags/区间-Dp/index.html","b662412e6fba262388b212f9c0c79a33"],["/tags/博弈论/index.html","5f818f7520482261453d2c1360090d01"],["/tags/双指针/index.html","f8ffee4dedf795f2416523fead91aca3"],["/tags/双端队列/index.html","c39842e5628fba4b99eabb6370ecd3d2"],["/tags/可持久化/index.html","60b40ae2b08dc55867985daaf68a9915"],["/tags/可持久化平衡树/index.html","bf52d5ee6317e1f8a1d81375231e0cc1"],["/tags/可持久化并查集/index.html","3950b447a7a400812aa4159527ba4178"],["/tags/可持久化线段树/index.html","d4afdd9c671c2d1c25f41918c6743ff2"],["/tags/可撤销并查集/index.html","e3c64a82ab917493e014a709ab09056f"],["/tags/后缀数组/index.html","b45c214c08c71484e71a6cc9f0b36c69"],["/tags/后缀自动机/index.html","4bb3278e84493c7709009cf2447d5ef2"],["/tags/启发式合并/index.html","5aab0e96344d9f4fc353502b30ca0c2e"],["/tags/回文自动机/index.html","7ffeb0d7457861c18b46e6b02850aa0e"],["/tags/回滚莫队/index.html","0081bc816645ad0864a120b4222d5053"],["/tags/图论/index.html","10a2fc6db4391c11356b749147878003"],["/tags/圆方树/index.html","3ef9ece8b2a1eb833bf14b788f4bd063"],["/tags/均摊分析/index.html","1d1796b884240de89a4d8596b3b2e9e9"],["/tags/基环树/index.html","eb5cc8ccc3d5aaf9a4af036def8d42ce"],["/tags/堆/index.html","95d4966b8fa6318fce734115cdf8b9c9"],["/tags/复杂度分析/index.html","7862c148a4fc672230a321f8a355d7be"],["/tags/复杂度均摊/index.html","6d2405fa82b99be4e02c1db3393e8c07"],["/tags/多元处理/index.html","1876f60608c6fced69ee454b47c3379d"],["/tags/多项式算法/index.html","2afdf620a8b4d18042693b0e36083757"],["/tags/字符串/index.html","b0a16e50b31c29677bf47c57166658a9"],["/tags/容斥/index.html","24d814cd2308900e2569de2e498ca5cf"],["/tags/容斥原理/index.html","e181431d457de809f18ad5dd4ba7c3d9"],["/tags/对顶栈/index.html","4856dc62597185874e42c539a8b184a2"],["/tags/导数/index.html","9c448bb0e1276475e3a5d6d04600c3da"],["/tags/带修莫队/index.html","e6790b092812550d1f285edd45d54a9b"],["/tags/平衡树/index.html","58357d0d1086ac2151ad496251c676f5"],["/tags/并查集/index.html","431dd16a6b6eff795a433bcb684861e0"],["/tags/序列自动机/index.html","6e819b1aef5109d26e33f61033af4537"],["/tags/归并排序/index.html","681086977b7e7d79010d201392a54c52"],["/tags/待修ST表/index.html","c9f7ead4918cb02650ace3e8133be602"],["/tags/循环节/index.html","66e24f243e309887f625e7f461dc8cb9"],["/tags/思维/index.html","da8809e50c38bd006548362c804d852f"],["/tags/思维/page/2/index.html","55eabbac151cfbc78bf322074293e803"],["/tags/思维/page/3/index.html","aacb9940ce41ca0d1f09abff5edd82e1"],["/tags/拉格朗日插值/index.html","0e58a665bfe6b2752fd0acff56a42cb3"],["/tags/换根-Dp/index.html","46d74be85f3161c1916345ad8717a885"],["/tags/搜索/index.html","f65a468f7c36df770dfc9936f89b20e0"],["/tags/数学/index.html","52a261d5a39b94351c35228ab397cd07"],["/tags/数学/page/2/index.html","1f7703cb486140eb8e346bc8da834f44"],["/tags/数据结构/index.html","36f6e32e7d927cf7df14c1394032556a"],["/tags/数论/index.html","b731c70c43e345dd622d22307cd58fd9"],["/tags/整体二分/index.html","a1297c2ae436e26b757e7622ff5e3cd6"],["/tags/整除分块/index.html","f7c1b8e34f26035440fd1e6db450bbbf"],["/tags/斜率优化-Dp/index.html","bf5f049cc2a85b443d0fb1d370554afd"],["/tags/最大流/index.html","745c77822640dca5cedbe022afd30731"],["/tags/最小割/index.html","1e2e5ecf8a5ef7ba843b4fe5015c23b0"],["/tags/最小割树/index.html","76aa8cc5e04f8b744c095478cba57143"],["/tags/最小生成树/index.html","fdaf5208e93650d1c7bb83d5836a1936"],["/tags/最短路/index.html","ee936d160e2a575bf5d72d8f1960c933"],["/tags/期望/index.html","baa0ca2d254b24481f4b2980ccfcd016"],["/tags/杂谈/index.html","9a5ea0476624e8122f88cd386100d95e"],["/tags/权值线段树/index.html","95c58a723decae7408ec3936eab917be"],["/tags/栈/index.html","6b486dff755c7cbc53f11e52ecae467a"],["/tags/树上莫队/index.html","2adbd9e7cdda77fd0ff2dc4e2aa7bca0"],["/tags/树剖/index.html","3707b1d849fb1b32605e719dbfd4315f"],["/tags/树套树/index.html","49b17d67a5897303057c1739b48c81ba"],["/tags/树形-Dp/index.html","17365298a95dd84ff1734d3a39a88138"],["/tags/树形-Dp/page/2/index.html","88d81a7d522015850b45d35e914fa23f"],["/tags/树状数组/index.html","b16804b3ab79d77edf54e86daa0e617c"],["/tags/根号分治/index.html","8cff02fd3f6d0cdb7acb4b5a8f5fde58"],["/tags/概率/index.html","f35aba80c0206728d9f5ff5e7312bd9c"],["/tags/状压-Dp/index.html","e90b3323feeb84a8134cdd086b5c48d3"],["/tags/状态压缩/index.html","503c6059086efa0d2722b87b8a5c5f38"],["/tags/珂朵莉树/index.html","695bb8a9022b7ecb0effa9310aa74f2c"],["/tags/矩阵/index.html","52c544384da032101a358cd94aa54508"],["/tags/碰撞/index.html","9fd94cec470031afed45316a19de88b0"],["/tags/线性-Dp/index.html","d14a8e26529f36797f921d9cb618a094"],["/tags/线性-Dp/page/2/index.html","9c3e91987807f60d3252d0fa63d55d98"],["/tags/线性基/index.html","07ce23463fa6ae0654dc7dddc2321923"],["/tags/线段树/index.html","54825a8badcab572b47ceb58b5578fc6"],["/tags/线段树/page/2/index.html","143579164d5f5d65de33b888fb06badb"],["/tags/线段树二分/index.html","e36f6e6dcb22ced7c6c7c833e2b5eb29"],["/tags/线段树合并/index.html","90605935b88f61adaf9ae100eebb2ee5"],["/tags/组合数学/index.html","ed6ec66a0c6cbfcafaee83599bc5ef76"],["/tags/网络流/index.html","6e905f8ade0f1596cd148fda42a1cc42"],["/tags/置换环/index.html","f7200401ebefa6538e13db5c43a95c4d"],["/tags/莫比乌斯反演/index.html","b677c05e5afb023d4beecdf19d70c496"],["/tags/莫队/index.html","af9e3aa65e8b5404183d40edfdd76706"],["/tags/虚树/index.html","fabd0b27f42ba790adc76a92b2f3eb78"],["/tags/贪心/index.html","42519ff1d6373fda4688b264db41474b"],["/tags/费用流/index.html","ad32a9cfa00808f84c8430a14f74afee"],["/tags/轮廓线-Dp/index.html","54336e10fec1e61ce188dfa1c12e6e71"],["/tags/连续段-Dp/index.html","d100126f95d416befcc88cb1e9b5e81a"],["/tags/逆序对/index.html","cf108924075cf25ac6ac04f80712a042"],["/tags/长链剖分/index.html","fcddf4723b458c71d3ece851bf12cfcb"],["/tags/随机化/index.html","25b663acdc7568df626b7d4b9cc1069f"],["/tags/高斯消元/index.html","fec08f169b1214b911bce1cce0f7742a"],["/undefined/2-SAT/2-SAT/index.html","78bd4f3e105057590bfd8c3f47bba8ff"],["/undefined/23总结/23总结/index.html","c3d387af3a391ff9de13773753e179bb"],["/undefined/ABC248-F/ABC248-F/index.html","4c5018adbbead1db20b8afa2e470a1ff"],["/undefined/ABC277-G/ABC277-G/index.html","80e8bf07713c21bc88e0293da8e78daf"],["/undefined/AT-dp-y/AT-dp-y/index.html","f19d4b97042378e5010b4137faee088c"],["/undefined/Boruvka/Boruvka/index.html","caf31cdd5c94f7627c902704e8ecc78c"],["/undefined/CF1876/CF1876/index.html","6b0ae0a069942e3e94b4f3e74310e4be"],["/undefined/CF27E-Number-With-The-Given-Amount-Of-Divisors/CF27E-Number-With-The-Given-Amount-Of-Divisors/index.html","6cd69ad53c1d10b422468de633a8176f"],["/undefined/CF708C-Centroids/CF708C-Centroids/index.html","b3d8651df263ff74bb075e62a2886a6f"],["/undefined/DFA-全家桶/DFA-全家桶/index.html","2476a31edc793e03b5126c27df28eca7"],["/undefined/Dfn序-欧拉序/Dfn序-欧拉序/index.html","db35e30ed4c9cb04a62c6ae381e7945d"],["/undefined/EXSTL-Pbds/EXSTL-Pbds/index.html","fb921125d03d9d6359e7be5f0a95a7bd"],["/undefined/EXSTL-Rope/EXSTL-Rope/index.html","feaf8e62db2c5ffbf5e3ba8a0522c7d7"],["/undefined/Extra-树状数组/Extra-树状数组/index.html","71be09044727a685135ad8c020a48c53"],["/undefined/Extra-线段树-优化建图/Extra-线段树-优化建图/index.html","0021991cd77b9d2e678ba01474ffbd8a"],["/undefined/Extra-线段树-动态开点 && 权值线段树/Extra-线段树-动态开点 && 权值线段树/index.html","8e46687dbed2a504a262e199c1ae78e7"],["/undefined/Extra-线段树-线段树分治/Extra-线段树-线段树分治/index.html","a7eabc4544a876eb99017b10fe5c3a46"],["/undefined/Extra-线段树-线段树合并/Extra-线段树-线段树合并/index.html","ae420e15dfcd775d3816a31b92168056"],["/undefined/Hash/Hash/index.html","87a69953857c44a5c49ddc4303f8710c"],["/undefined/IDA-拯救世界/IDA-拯救世界/index.html","7c326b22583bf448ffdfc497b7855b62"],["/undefined/KD-Tree/KD-Tree/index.html","64eea70b822818cb343c4c1450144f63"],["/undefined/Kru重构树/Kru重构树/index.html","885a62596e5c2258b5eb1ae596c2b164"],["/undefined/Last-Season-1-CSP/Last-Season-1-CSP/index.html","3a90596a34b56be533ffcf333cf178e9"],["/undefined/Luogu-Simu10/Luogu-Simu10/index.html","acf4707d0ca635f23a77b3b8feb9aedc"],["/undefined/Luogu-Simu4-T1/Luogu-Simu4-T1/index.html","f8f6560c8f0f9c367c4bb853e1a47089"],["/undefined/Luogu-Simu4-T2/Luogu-Simu4-T2/index.html","40e3ae2a433e9e0e61876b805069859f"],["/undefined/Luogu-Simu5-T1/Luogu-Simu5-T1/index.html","41274aa2b5c4430fa3c5133b52cce72e"],["/undefined/Luogu-Simu5-T3/Luogu-Simu5-T3/index.html","4c8972383c211cc00129a51ccc937fc5"],["/undefined/Luogu-Simu5-T4/Luogu-Simu5-T4/index.html","9fd4d58a6350ee70e91b233e1e1b59b8"],["/undefined/Luogu-Simu6-T1/Luogu-Simu6-T1/index.html","3751e26cbae3457b33d248f001400234"],["/undefined/Luogu-Simu6-T2/Luogu-Simu6-T2/index.html","5357ff843cf0d03aee591983ae04e93b"],["/undefined/Luogu-Simu6-T3/Luogu-Simu6-T3/index.html","22dadcf71fb3f6a4171959feb08db86d"],["/undefined/Luogu-Simu7-T3/Luogu-Simu7-T3/index.html","f67df4a4d1f50db24e7d242a4790d157"],["/undefined/Luogu-Simu7-T4/Luogu-Simu7-T4/index.html","5e8bb702520635e34af0dc748fc7af86"],["/undefined/Luogu-Simu8-T1/Luogu-Simu8-T1/index.html","1846e4a8eae2440ad62e25f681d4802a"],["/undefined/Luogu-Simu9-T2/Luogu-Simu9-T2/index.html","9586ac6d6213b25a19916bc109de0a0b"],["/undefined/P2150-NOI2015-寿司晚宴 & P8292 [省选联考 2022] 卡牌/P2150-NOI2015-寿司晚宴/index.html","c89472a1661bb777049aee94923f249d"],["/undefined/P2157-SDOI2009-学校食堂/P2157-SDOI2009-学校食堂/index.html","bdbeabc7f6666664694a46dbc4415b35"],["/undefined/P2331-SCOI2005-最大子矩阵/P2331-SCOI2005-最大子矩阵/index.html","6da4df834cf54c723d12ba7890bf59db"],["/undefined/P3253-JLOI2013-删除物品/P3253-JLOI2013-删除物品/index.html","31145c35049054f38ca2efd9499bc481"],["/undefined/P3551-POI2013-USU-Take-ou/P3551-POI2013-USU-Take-ou/index.html","1310b22512181e6fae81af1a11671e7b"],["/undefined/P3668-USACO17OPEN-Modern-Art-2-G/P3668-USACO17OPEN-Modern-Art-2-G/index.html","a29fd04e52c2cbde0e0c91a973bfbc71"],["/undefined/P4824-USACO15FEB-Censoring-S/P4824-USACO15FEB-Censoring-S/index.html","14e823cf182f036675a6c380164c291b"],["/undefined/P4940-Portal2/P4940-Portal2/index.html","86e64da83f858ca82fada25221bc67ca"],["/undefined/P5426-USACO19OPEN-Balancing-Inversions-G/P5426-USACO19OPEN-Balancing-Inversions-G/index.html","dcc6918044129c71870425089a87d541"],["/undefined/P5522-yLOI2019-棠梨煎雪/P5522-yLOI2019-棠梨煎雪/index.html","733e0ea11bf94abf4034926a40cf8551"],["/undefined/P5835-USACO19DEC-Meetings-S/P5835-USACO19DEC-Meetings-S/index.html","c723b90aaa1f26f728d42281b538f070"],["/undefined/P5978-CEOI2018-Global-warming/P5978-CEOI2018-Global-warming/index.html","d7d977e5012299f238787ea95b558e61"],["/undefined/P6064-USACO05JAN-Naptime-G/P6064-USACO05JAN-Naptime-G/index.html","958d785ce1ecb2dedc3c70b9c192db2f"],["/undefined/P6148-USACO20FEB-Swapity-Swapity-Swap-S/P6148-USACO20FEB-Swapity-Swapity-Swap-S/index.html","4240c8a94373d4601dd4a5dd45b75138"],["/undefined/P6381-『MdOI-R2』Odyssey/P6381-『MdOI-R2』Odyssey/index.html","e8075ec2191433bd55692250f2045bd2"],["/undefined/P7077-CSP-S2020-函数调用/P7077-CSP-S2020-函数调用/index.html","2d6d03bc8505a3bf711725aedcd6f04d"],["/undefined/P7108-移花接木/P7108-移花接木/index.html","2da16d52df70b84f31fe7858345f6e97"],["/undefined/P7249-BalticOI-2012-Day1-移动网络/P7249-BalticOI-2012-Day1-移动网络/index.html","6a2478a6929d32e017ee32737b838bed"],["/undefined/P7291-「EZEC-5」人赢-加强版/P7291-「EZEC-5」人赢-加强版/index.html","e052565abd40a35634f868c0f7a87a60"],["/undefined/P7355-「PMOI-1」抽奖/P7355-「PMOI-1」抽奖/index.html","77c1d11428148098f1edace0b2644537"],["/undefined/P7789-COCI2016-2017-6-Sirni/P7789-COCI2016-2017-6-Sirni/index.html","d4c6b57839c8068d83473f95c1f7fae7"],["/undefined/P7811-JRKSJ-R2-你的名字。/P7811-JRKSJ-R2-你的名字。/index.html","edf4378c4c3b5cb96ed338f6288a213f"],["/undefined/P7915-CSP-S-2021-回文/P7915-CSP-S-2021-回文/index.html","83088927e05449fd34607b2d68af2d0a"],["/undefined/P8252-NOI-Online-2022-提高组-讨论/P8252-NOI-Online-2022-提高组-讨论/index.html","410b94adb5045d7f49826d2366397efb"],["/undefined/P8365-LNOI2022-吃/P8365-LNOI2022-吃/index.html","c3271757568e4308ff847c9fe8f7bdcd"],["/undefined/P8817-CSP-S-2022-假期计划/P8817-CSP-S-2022-假期计划/index.html","ce36d7dee4d32d30b6ab00dd60afdfbe"],["/undefined/P8905-USACO22DEC-Strongest-Friendship-Group-G/P8905-USACO22DEC-Strongest-Friendship-Group-G/index.html","76818a5b1a47f0fa37b046d7d5b127ca"],["/undefined/P9019-USACO23JAN-Tractor-Paths-P/P9019-USACO23JAN-Tractor-Paths-P/index.html","64c98ab8cb9f21ac84022c086e3119f1"],["/undefined/P9378-THUPC-2023-决赛-物理实验/P9378-THUPC-2023-决赛-物理实验/index.html","5fcfebceda0733706a49e60f5a43cd81"],["/undefined/P9437-『XYGOI-round1』一棵树/P9437-『XYGOI-round1』一棵树/index.html","9db29f790c0efccf9cd281afda23a4f9"],["/undefined/P9715-「QFOI-R1」头/P9715-「QFOI-R1」头/index.html","44e65f69bb838b92c5d935bae41d65e6"],["/undefined/P9745-「KDOI-06-S」树上异或/P9745-「KDOI-06-S」树上异或/index.html","2683d79d0309becf0e6413ea86c927b7"],["/undefined/P9753-CSP-S-2023-消消乐/P9753-CSP-S-2023-消消乐/index.html","52bac6d4690c0e7b0ec907796f4f0543"],["/undefined/Solve/Solve/index.html","51613ec998fd3d9c0ab3746fac8d2346"],["/undefined/Tarjan-圆方树/Tarjan-圆方树/index.html","7d275598697aeaaeec3b2d47776f70b2"],["/undefined/Vivia-主题相关/Vivia-主题相关/index.html","8f862c5e453c48f6e46e69d0ef64e74d"],["/undefined/cdq-分治/cdq-分治/index.html","394451980a1250e9c58d07861455a2da"],["/undefined/hello-world/hello-world/index.html","0c024a1ff34512443225b4091cbacccf"],["/undefined/三分/三分/index.html","c4ee785ad5678ec8f03ce882127e7727"],["/undefined/串串进阶/串串进阶/index.html","31491201ab15e7ce76f6aa2e3a235186"],["/undefined/写于NOIP之后/写于NOIP之后/index.html","5f79aea04b00f62ded14fad2d6d2e370"],["/undefined/分治进阶/分治进阶/index.html","ca2fb6fc9ce565e8df742ca74acf04b2"],["/undefined/可持久化并查集/可持久化并查集/index.html","8c5f77fe05a19d1a2011746e175938fe"],["/undefined/启发式合并/启发式合并/index.html","94424a136822faed924c6432b73555f4"],["/undefined/基环树-Dp/基环树-Dp/index.html","0c4f2407a31c35ab076bbce17d6f7cd7"],["/undefined/多项式全家桶/多项式全家桶/index.html","6a01fb5591586f43c7782d7b185cac10"],["/undefined/定义/定义/index.html","326d9ea9039924d37a8f2e94b29d4d6b"],["/undefined/平衡树进阶操作/平衡树进阶操作/index.html","24b941dc21e1f2790eb60db06a29e7ab"],["/undefined/建站ing/建站ing/index.html","5e7efacfc12b6cf290bb8b6db76374dc"],["/undefined/数论进阶/数论进阶/index.html","4fa03c09a8494d5fd8cf41b2dfc6715c"],["/undefined/斜率优化-Dp/斜率优化-Dp/index.html","8e22d23c2ee8d2cc13f960c79928e502"],["/undefined/最大流/最大流/index.html","2a50f05fc195e48133a36ae5fad7230e"],["/undefined/最小割/最小割/index.html","edc3d7b9c383767de8795b9530c16594"],["/undefined/最小割树/最小割树/index.html","dec3881bcddcecf550a7dfe546ebd26d"],["/undefined/杂题精选-Nov-1-Wildest-Dreams/杂题精选-Nov-1-Wildest-Dreams/index.html","94d1d585aadc22b11bd77fce7793d1bf"],["/undefined/杂题精选-Oct-1-The-best-People-in-life-are-free/杂题精选-Oct-1-The-best-People-in-life-are-free/index.html","3dec09030f753ae42b0bc54eb3ed51d1"],["/undefined/杂题精选-Oct-2-数据结构萌萌题/杂题精选-Oct-2-数据结构萌萌题/index.html","42a85af163ec141842005307a6c37d60"],["/undefined/树/树/index.html","5d9abc2ccd2c8748743ee8b0122b8da7"],["/undefined/树上启发式合并/树上启发式合并/index.html","fa1f70d6b01882924916401b06c668bd"],["/undefined/树剖/树剖/index.html","a6ad63c07a4b350d81ccf25b5132d0c0"],["/undefined/树套树/树套树/index.html","e75995b3863a27c5444431b88df9dc9e"],["/undefined/概率期望/概率期望/index.html","83d399379ec16a2c83ece23fc7502252"],["/undefined/浅谈分治/浅谈分治/index.html","4711d06216642e0bc994b8ffe85467fb"],["/undefined/浅谈前后缀思想/浅谈前后缀思想/index.html","6402349dca2fc0ee1ada4cffd6f0190d"],["/undefined/浅谈单调序列绝对值和最小化/浅谈单调序列绝对值和最小化/index.html","7cdce2849342dc9dd2a943013bfc59e8"],["/undefined/浅谈博弈论/浅谈博弈论/index.html","a226e0ab02ccef6e424503d298a13343"],["/undefined/浅谈字符串/浅谈字符串/index.html","96ac9e941b284cdfa4564a865fc934cd"],["/undefined/浅谈随机化/浅谈随机化/index.html","65fe01263bcff9c6babd88520a33809a"],["/undefined/浅谈随机堆/浅谈随机堆/index.html","c6562c1a7774334704193df63a5fdfae"],["/undefined/浅谈集合选数前-k-大/浅谈集合选数前-k-大/index.html","258486097ec973d49cce12e755ce4bbf"],["/undefined/珂朵莉树/珂朵莉树/index.html","0e96059fcfc4bd87a492e9f1ea2b770b"],["/undefined/省选模拟赛补题/省选模拟赛补题/index.html","e9f07b212b97d93aaf71294badc8cd36"],["/undefined/线性代数/线性代数/index.html","e254f365078f9b00743d65a6285b9bdc"],["/undefined/线性基/线性基/index.html","8bca3023599b33f300e2ac880de5fdf4"],["/undefined/组合数学/组合数学/index.html","15272350df4cba57f37c530e0cc0d19d"],["/undefined/网络流/网络流/index.html","a8672d6bc61c229d62e3164a45013adc"],["/undefined/网络流复建/网络流复建/index.html","dbd3393a4bb364f743a0a47d541929d8"],["/undefined/莫队进阶/莫队进阶/index.html","c317b5332f82a2fcdcddfbb1c9af4b4e"],["/undefined/虚树/虚树/index.html","74650813ba0c8bdfb56be056fd71ff19"],["/undefined/费用流/费用流/index.html","877c4823a86271074cd2e5d0c0469c54"],["/undefined/连续段-Dp/连续段-Dp/index.html","f9aee9dc52e079ecf4525ad28ba005f8"],["/undefined/长链剖分/长链剖分/index.html","b5ec61b9275ea97f4de5f2521cd10b9d"],["/undefined/高联23一试T8T11妙解/高联23一试T8T11妙解/index.html","0e38901fd2ec9f6987304f28602ccf3a"],["/undefined/鲜花-1/鲜花-1/index.html","e04edbd711844bbb89b73eed7f6a5cb8"],["/webfonts/fa-brands-400.ttf","2f73c22e9ab02b8f923c9577fb267e3c"],["/webfonts/fa-duotone-900.ttf","5043107ed7dba7b22fea520507ffcbfa"],["/webfonts/fa-light-300.ttf","56720c95107daf1fc8c4e3efbde50d44"],["/webfonts/fa-regular-400.ttf","fba93793e177af4a2277e468db6e409f"],["/webfonts/fa-sharp-solid-900.ttf","258a4bbc66f0b3e34c28b4026816ec72"],["/webfonts/fa-solid-900.ttf","7b93722a98b0178b89cad243a020f45c"],["/webfonts/fa-thin-100.ttf","eedf47e45505ceb0798e86e80856a246"],["/webfonts/fa-v4compatibility.ttf","69ecd6a58b5b719735db6f4fbce1d48d"]];
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
