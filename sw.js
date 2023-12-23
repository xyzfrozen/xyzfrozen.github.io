/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/404.html","7c3abf5bc7cb18aceedf1548eeebcd65"],["/about/index.html","c220b4ed3085a55478b0d1750ae95e88"],["/archives/2023/09/index.html","bee40664b9bb2f30b9f1a911a76048e6"],["/archives/2023/10/index.html","e5bf9cca9c83845cef0cc8e96b01e53d"],["/archives/2023/11/index.html","4c515f8d79d681701d27cb546965b0d8"],["/archives/2023/12/index.html","97d6cecd0cedfe8779ae2bb215cd1569"],["/archives/2023/index.html","328c8594be2e09395d86b5e4a289ee0c"],["/archives/index.html","cbd4b8595e053933c2abd86065d1009e"],["/assets/build/styles.css","e8355bd1bbe04a2377568c4a407119f4"],["/assets/hbe.style.css","c94ef63e0056de67b35bf1385cd23136"],["/assets/odometer-theme-minimal.css","d50a198c326f1767cdaecdb7c67b392d"],["/categories/ideas/index.html","a6d76ddd85c534aa6f1b061088e3e830"],["/categories/index.html","1ca9ea631f9034e40b24e2c04670c665"],["/categories/note/index.html","ba78c0b0e8d0c5653136f67ce027ca31"],["/categories/note/page/2/index.html","5b10d4c5ece32ec03fd9a5c508203267"],["/categories/note/page/3/index.html","fe7aeb6a9009949b1fbfec726d7f4432"],["/categories/note/page/4/index.html","b79c4ed4a33cca8eef7ef8480b34b593"],["/categories/note/page/5/index.html","6837f19b8990d4903d0966b1a9901f32"],["/categories/problem/index.html","5428d069bbad6c2a931560fcf48f46a3"],["/categories/problem/page/2/index.html","0252183d9d9c35db0e71eeafafdc9380"],["/categories/problem/page/3/index.html","dec89e8f544a685e1fcacf660d8b0587"],["/categories/problem/page/4/index.html","5256ca5240b0bf86c661eb5c5ec1b293"],["/categories/problem/page/5/index.html","16c33179f1226a8cb8d736f62fd705c7"],["/categories/problem/page/6/index.html","c6d88f57324aa056f6a01bbf496f22e2"],["/categories/technology/index.html","a2195558faa51b18bb64f4a54c60fc89"],["/categories/杂谈/index.html","a5f9beb8d0b71bd446990c6b2e5ca58b"],["/categories/碎碎念/index.html","fedf2922db552c08483c6d160d9979bc"],["/css/common/animated.css","b2aecba9b34c3593d241f2c118a98ae1"],["/css/common/basic.css","7f0ff1d77c9c5fb76023ff1779d9e98f"],["/css/common/codeblock/code-block.css","641572522f017055b703ba651693e89b"],["/css/common/codeblock/code-theme.css","a0ebfd1c37296db7537a252a6eb4ba71"],["/css/common/codeblock/highlight.css","047bfc2a102adb26a67d26d6cfb370de"],["/css/common/markdown.css","0f093295106a47da4a5bf33ed123c1a4"],["/css/common/redefine-theme.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/common/variables.css","cc6a286463eb421ebd870763d97fe051"],["/css/hbe.style.css","c94ef63e0056de67b35bf1385cd23136"],["/css/layout/archive-content.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/layout/article-content.css","7794e8a50e47703216223fe2c2f83c1b"],["/css/layout/category-content.css","4e0b84217a0d3632750ae6bf0d56ba6f"],["/css/layout/category-list.css","cd856dcc7f0daded2dad18b6ff213707"],["/css/layout/home-content.css","9b8e2b763443ab72cc5ce715a6a5fb3d"],["/css/layout/home-sidebar.css","16d12a6625e4a18ee2bc52ee096e8ba2"],["/css/layout/page.css","8ed1350276654c632042b3dd96cce1ad"],["/css/layout/tag-content.css","e792ee43f1efd78cfa3dbd9044969b4f"],["/css/style.css","f651539842db99d600bbb99ddd4f4924"],["/fontawesome/all.min.css","9ec513d705ed7f4deb2b50bb05914817"],["/fontawesome/brands.min.css","40960f6969b87896c9889de920787ae8"],["/fontawesome/duotone.min.css","6d17219d846a2851c2ed490a62dd38cb"],["/fontawesome/fontawesome.min.css","7f252c83010f3cada47ee6a6f71d1ee8"],["/fontawesome/light.min.css","99d663cdb4567e9c0c000fc52c670fb8"],["/fontawesome/regular.min.css","020abce5e17082f0f18f92aed092c0b0"],["/fontawesome/sharp-solid.min.css","20abfb823fecc8a6a73458c5edd394f9"],["/fontawesome/solid.min.css","f484f18056587df321165f744e9ba571"],["/fontawesome/svg-with-js.min.css","c40530bda390deaaed914c49f34d9e1e"],["/fontawesome/thin.min.css","f44cae780bf8a7287221c340cbe4d815"],["/fontawesome/v4-font-face.min.css","52325430f1fa7f983a32f712ebb59b3a"],["/fontawesome/v4-shims.min.css","4d764578be067a44af663d56be333195"],["/fontawesome/v5-font-face.min.css","1cb7f16555da63aecd2828d3d3130d85"],["/fonts/Chillax/Chillax-Variable.eot","f8ea7af333c768147f674ba526612248"],["/fonts/Chillax/Chillax-Variable.ttf","5f13274ffe3e1ee77b67324cb1a9cf7c"],["/fonts/Chillax/Chillax-Variable.woff","16fee1e0f2e5db01ad15ce4535ad39e2"],["/fonts/Chillax/chillax.css","0d2090517a2cb42f32bd86454b2bb1e0"],["/fonts/Satoshi/Satoshi-Variable.eot","f953920d265c265d55029a0044a7b122"],["/fonts/Satoshi/Satoshi-Variable.ttf","bc0207192e408b721fa14151690c6a66"],["/fonts/Satoshi/Satoshi-Variable.woff","bd7cac4b844318aa2b2f168b57b45c22"],["/fonts/Satoshi/Satoshi-VariableItalic.eot","9888965098b0fe3121439e5293e5f63d"],["/fonts/Satoshi/Satoshi-VariableItalic.ttf","db98db5c0d84369d2586aaf5eedc3376"],["/fonts/Satoshi/Satoshi-VariableItalic.woff","aa09c255fd899a8d89fc4636c0c9db4d"],["/fonts/Satoshi/satoshi.css","1baa156aca1baa1b570089def9ee55ec"],["/fonts/fonts.css","c96283423d2ff104322986b7338b3eba"],["/fonts/noto-sans-sc-v26-chinese-simplified-700.woff","3575965a87411920b48f5bd97b38810d"],["/fonts/noto-sans-sc-v26-chinese-simplified-regular.woff","0ed89b72b63509b506025450c77bfe43"],["/fonts/ubuntu-mono-v15-latin-regular.woff","86bd37776667f31cd9c6d0a2a9fa7ef5"],["/image/Violet 1.jpg","eb023ca433bc1de215c0a0d15fd1d616"],["/image/author.jpg","44d0486db9384c602d929f1ec2f519f9"],["/images/loading.svg","e1de41eda143447d3b338e77f7ace18f"],["/images/redefine-avatar.svg","fd210fedbfe357f35c570f61b943481b"],["/images/redefine-favicon.svg","badc8db1a4c3d1845db4e4ffec333d9e"],["/images/redefine-logo.svg","80a88fff4a3bb50559543e80477aa571"],["/index.html","6de92b810c9936c8ab41d54c9c45e7f2"],["/js/layouts/categoryList.js","be8705c55bfaa476c5cf3fd995409305"],["/js/layouts/lazyload.js","728031a7240822da29d5bd927d1e1727"],["/js/layouts/navbarShrink.js","43a834b08201e6db83de9c56ea05d4b6"],["/js/layouts/toc.js","cb98abb318dc0eda4bac6ec6d43faf10"],["/js/libs/APlayer.min.js","8f1017e7a73737e631ff95fa51e4e7d7"],["/js/libs/Swup.min.js","9ff02a08a69fe4addbd9af33359deabf"],["/js/libs/SwupPreloadPlugin.min.js","170c2637b152f61a7225171523b9e5f3"],["/js/libs/SwupProgressPlugin.min.js","f9eb5c6b192ac1dcd18b12666a647fd0"],["/js/libs/SwupScriptsPlugin.min.js","30935c9aeeb587c49d2e30c28f57c5e7"],["/js/libs/SwupScrollPlugin.min.js","85fe68c41c48170dd104ee4f29690798"],["/js/libs/SwupSlideTheme.min.js","2b1d521e1b83b5ffc073ad31045e682a"],["/js/libs/Typed.min.js","f68641147185cbded4b38b4900a20f40"],["/js/libs/anime.min.js","864a144dbbc956381a47679ec57ab06c"],["/js/libs/mermaid.min.js","07d4a62ba2e5b0e44077bd9b481fd75d"],["/js/libs/minimasonry.min.js","a3b6453136c8edd4fdd374171f022ffa"],["/js/libs/odometer.min.js","519a5777444f5965b6df23e26c69f037"],["/js/libs/pjax.min.js","d810aff16a7f45392bdeec5493ebee8e"],["/js/main.js","295801b1c2b4f7fd1d85f34fadc94805"],["/js/plugins/aplayer.js","13934c08bc9325eaad918b497d1216fd"],["/js/plugins/hbe.js","e3e4ff16a0beaa851e3926b5d26079c7"],["/js/plugins/masonry.js","5a2fb5815ba12e2efb0323a526dc623f"],["/js/plugins/mermaid.js","929a9284ea999064bc6842d28bf9f102"],["/js/plugins/tabs.js","a6eca0aaba3fd4a5cb8539b129d742cf"],["/js/plugins/typed.js","b3456d138a26a01d00f06e4fcc0a0477"],["/js/tools/codeBlock.js","187983273eb159f9fab0f4bb8d4d02c3"],["/js/tools/imageViewer.js","c6e3a4bbd5ee5fbe51806092601127f9"],["/js/tools/lightDarkSwitch.js","ab6260f82f3916594294df5ff3e86c94"],["/js/tools/localSearch.js","d9ecf11b97c82251978084566e399426"],["/js/tools/runtime.js","87f27761db6f7a197f99739804ee0c1d"],["/js/tools/scrollTopBottom.js","d984b4612439ba4d47813e1dd1bf46f2"],["/js/tools/tocToggle.js","cd72e98af728161a67fa6b2df9b28d5a"],["/js/utils.js","0cb3343ba95bde5bb08690b6b49b6c5d"],["/lib/hbe.js","e3e4ff16a0beaa851e3926b5d26079c7"],["/page/10/index.html","277507d351179b353af5e114982975b6"],["/page/11/index.html","58f4b0180d53f92f0a9e8039609fb60d"],["/page/2/index.html","fbe97624afafe0692d2d75f965ad1af7"],["/page/3/index.html","5c687948f8e495bc5cd008f36c604770"],["/page/4/index.html","901afce70211cfddf778166fc4d2ab74"],["/page/5/index.html","d03e37fde47ba75810529bfde13f6916"],["/page/6/index.html","c524aac78ac877931910f9a36f655944"],["/page/7/index.html","4ed3b05a258f20a0386c732a8b119503"],["/page/8/index.html","90bef56d5190ec0379ec4896fa887b21"],["/page/9/index.html","1b972938e7be43f96dda47774d7b679c"],["/sw-register.js","7a8fc6eea276f87763a14fb655f7759a"],["/tags/2-SAt/index.html","a8c9797303f542a7a19860631da62542"],["/tags/Fhq/index.html","7e3f23019a51d065cf63fb49cf0b9f00"],["/tags/Hash/index.html","1cf1600863f9181b6d53007773dfa16c"],["/tags/IDA/index.html","f9fb30a7f4271761498f29f58b28c5d3"],["/tags/KD-Tree/index.html","023a943a47984e5e5cf7f1a1020e4f15"],["/tags/KMP/index.html","a73ea01ac4349428ce7f852a8a3e865e"],["/tags/Kru-重构树/index.html","c0c7e767e0a6df6e1354c84e1949d58f"],["/tags/Kru重构树/index.html","e1f3176a8a9027d9bfa90d79c86d8758"],["/tags/LCA/index.html","78307d16514e19e884e6cfcf8ac53d97"],["/tags/LCP/index.html","dd8f58878bfda6b0e42b0aecd6025463"],["/tags/MST/index.html","a6e124b4630f4ae8141d76ec1e363773"],["/tags/Tarjan/index.html","3e438363f37b8ca3553b498b29b4a590"],["/tags/Topsort/index.html","65bce09742591776ecc5c3c3e4d358b5"],["/tags/Trie/index.html","55ad35a6d2c15a1675a18f7f0f55d383"],["/tags/index.html","ac4bbb6831c9da673dce309745f0888f"],["/tags/三分/index.html","eea15dd8529843ab98a76ad1fa262c07"],["/tags/二分/index.html","18eaf9eccf15fa005691aa626b6a1637"],["/tags/二分图/index.html","646f9616b59add7f7400f13bfeba192a"],["/tags/二维数点/index.html","1a9f50e9e7ebe853810186ee8e6860e7"],["/tags/众数/index.html","d98862ed0f5184d5955d9b0fce1e8a58"],["/tags/倍增/index.html","deee9adfebefb3c85705ff42f78a8b7e"],["/tags/偏序/index.html","5c4c5467c5af0c221638a336c262437e"],["/tags/分治/index.html","f7389085101927687ca7e19e72fd0f64"],["/tags/前缀和/index.html","8d701d0d13ba00f862cb45873dea2aa3"],["/tags/动态开点/index.html","a8013b226731514a445ac3cb0c5dcb9a"],["/tags/动态开点权值线段树/index.html","970478333a81dc124598212a177a2f15"],["/tags/区间-Dp/index.html","55fef24fa6799216074b7d6b798ef6bf"],["/tags/博弈论/index.html","5897858d02cc6697ff5a791b0d8ab532"],["/tags/双指针/index.html","ed4a1e7317ef59d1d8f62d2ac3d59984"],["/tags/双端队列/index.html","e69e7820ddeb1a9cd53b58494fc11166"],["/tags/可持久化/index.html","b917b771e394cd98007b7ef2e5821e02"],["/tags/可持久化平衡树/index.html","ff56f8df9f0661b6da833bee0b57a9eb"],["/tags/可持久化并查集/index.html","2f7a63b08a856293f324801863b8e389"],["/tags/可持久化线段树/index.html","ed9ba7812717a84d424a355c2e174dd7"],["/tags/启发式合并/index.html","2ff8afaadeb89d8303eb5e83e26e8cb8"],["/tags/图论/index.html","9cd302d4683772f723154c6fe1a6117b"],["/tags/圆方树/index.html","f2b30abf2821b33a2c5e6efbe3540f79"],["/tags/均摊分析/index.html","99b894c8dee7a8f02a0ebc20d0229875"],["/tags/基环树/index.html","8d367a723e8cde9ae8f79cbe9f2f00bb"],["/tags/堆/index.html","3e3e980317b9152b416731886526ed2c"],["/tags/复杂度分析/index.html","1a220440c76011fcfe730b7a28ffe9e0"],["/tags/复杂度均摊/index.html","c75ae9d49326ca6aaad31ad8bd320951"],["/tags/字符串/index.html","e10cee12f46cbf4464d05b20c2281f25"],["/tags/容斥/index.html","4567f7c3822bf5efa787a18564ab712d"],["/tags/容斥原理/index.html","f33fe5a24f65c5cbc679f6ea4e5e4408"],["/tags/对顶栈/index.html","fa0572a334744fc6eb0e32df275bb018"],["/tags/平衡树/index.html","5edb1fb066c67c780fb40b70293f797c"],["/tags/并查集/index.html","ef78da7ffb5456fda9dd56e1cb3a6389"],["/tags/归并排序/index.html","b8d641842a2b9fca9c224664ee500c5b"],["/tags/循环节/index.html","53116ad21c875376e94343681b90bd5e"],["/tags/思维/index.html","a3e7e59ec066113b0906b3663497b55c"],["/tags/思维/page/2/index.html","a7c29b550c5a34a77f7fa71c1735c003"],["/tags/思维/page/3/index.html","4da6001cd7b09f0ab58cea07926551cd"],["/tags/换根-Dp/index.html","e67bfb5b7acc8992ae67a396bf693606"],["/tags/搜索/index.html","c506fec20185964816f72cc7a6921696"],["/tags/数学/index.html","2576dd2a40b1dad89bab8db52d13cc80"],["/tags/数学/page/2/index.html","a04367ab349f0181ce8fb6e3186e4e02"],["/tags/数据结构/index.html","a6f2b001b38dc909b4f3ff4e7730eb39"],["/tags/整体二分/index.html","84aae30eeb8f8fb4cc6140a92709fa84"],["/tags/斜率优化-Dp/index.html","63e1728b26211a23c421a2a209784665"],["/tags/最大流/index.html","74a6087004cb4466448ebdce5a08fb41"],["/tags/最小割/index.html","36e5caf8f5815aa5fab56ce2cce00a9c"],["/tags/最小生成树/index.html","a942b3960663b05a1f759260c0fb8811"],["/tags/最短路/index.html","3c7ae2c7a29474c0051308e3b7c024b5"],["/tags/期望/index.html","2a058db1d4368c01ec8402124e3c9e65"],["/tags/杂谈/index.html","aff349fae3706dde13402001c312f3f8"],["/tags/权值线段树/index.html","85711ab5a3135ab6f769925c712ce9f2"],["/tags/栈/index.html","ac0537f7c66f0b1e0e019812ac248bf2"],["/tags/树剖/index.html","7474bfd10df6bf84b92ba3af931df048"],["/tags/树套树/index.html","f93736bddce86ae789e6892ed2009faf"],["/tags/树形-Dp/index.html","3177fc2094b550ab1bfc0262ef8067c3"],["/tags/树状数组/index.html","7778f0e2669fc076883164015f4367c7"],["/tags/根号分治/index.html","7797342c78717697626d4d2cb5cb5238"],["/tags/概率/index.html","ce7238b31d2950b42d5acb35863f81c7"],["/tags/状压-Dp/index.html","4682f525523f2a1fc4f2b2b412a1d90e"],["/tags/状态压缩/index.html","1d804694b760c08ae24501e43128ceda"],["/tags/珂朵莉树/index.html","9443cffb742f534c1aeb4cc7713c53de"],["/tags/矩阵/index.html","a3b5d888c55d0ef1f8b301a2ad45a07c"],["/tags/碰撞/index.html","1cf6442ae39b413d00e123fd7cbadcda"],["/tags/线性-Dp/index.html","102c5e6977f0a47b607188bc8670c76a"],["/tags/线性-Dp/page/2/index.html","09dddee8d048c4abbb6aa10eb26ecbe6"],["/tags/线段树/index.html","c7e3e2884c5d15784359998696f8aa78"],["/tags/线段树/page/2/index.html","8b4a44c987ba939c05adc010f36ff76d"],["/tags/线段树二分/index.html","8839f6a5f86147e08a9225e8219c290b"],["/tags/线段树合并/index.html","3ea70aad9a75c51fdd631483a777e07b"],["/tags/组合数学/index.html","32cbdfc61f9abbf56f3bda4350d66436"],["/tags/网络流/index.html","a7c94f5da7b3c60329ad8813d1e187ed"],["/tags/置换环/index.html","5da1264ad8abd0fc60799dd3b11152d7"],["/tags/莫队/index.html","a5302d4c691b89192a8cfa8a2d2bf45f"],["/tags/贪心/index.html","19c498e1e994df18c8f70b6900936314"],["/tags/费用流/index.html","883e438ec223b7452be5a67fc9d8e992"],["/tags/轮廓线-Dp/index.html","de82142e5d3d3cfdf0f4af1e36895be1"],["/tags/连续段-Dp/index.html","b359ae1d6260455a73a7b3851d6c5a4b"],["/tags/逆序对/index.html","b19f6eee33a0c1af982c14370f385041"],["/tags/随机化/index.html","063aeb1dff39683d2895c0f96f16b9a7"],["/tags/高斯消元/index.html","b4ef2e4194dba1a3bd24b6b972f3ba66"],["/undefined/2-SAT/2-SAT/index.html","ad59dad435ccb6efb6a1b97c796670a9"],["/undefined/ABC248-F/ABC248-F/index.html","aa40a8f04c5295b6a628476431228fcd"],["/undefined/ABC277-G/ABC277-G/index.html","0e5ef45e7ef25551e5951156128acab8"],["/undefined/AT-dp-y/AT-dp-y/index.html","01e67202e42c63533dab9bda20df45e3"],["/undefined/Boruvka/Boruvka/index.html","526899e3fbf3951e1cfa52edcae40965"],["/undefined/CF1876/CF1876/index.html","6fb6d507b4cd60a1d7a5e922cb2eb2fb"],["/undefined/CF27E-Number-With-The-Given-Amount-Of-Divisors/CF27E-Number-With-The-Given-Amount-Of-Divisors/index.html","4cc86dae05ab8682fcaa7fd18ac6c9d2"],["/undefined/CF708C-Centroids/CF708C-Centroids/index.html","f9f2847d42dae53535456ad45d18a73c"],["/undefined/Dfn序-欧拉序/Dfn序-欧拉序/index.html","532f41f5a58f1dd71d91ac869ac0aae9"],["/undefined/EXSTL-Pbds/EXSTL-Pbds/index.html","de0b209fb28244db63baa5fa33c01ec9"],["/undefined/EXSTL-Rope/EXSTL-Rope/index.html","09e3d767d0c8ed2149ba23ad96846d1a"],["/undefined/Extra-树状数组/Extra-树状数组/index.html","484c3ddf1d855ae7d897d955a05b3a72"],["/undefined/Extra-线段树-优化建图/Extra-线段树-优化建图/index.html","f4e37c2cc0507f1e1f3542916c6e497c"],["/undefined/Extra-线段树-动态开点 && 权值线段树/Extra-线段树-动态开点 && 权值线段树/index.html","44114b3a0dc50c6d8ba5b55c5f0c933f"],["/undefined/Extra-线段树-线段树合并/Extra-线段树-线段树合并/index.html","377da35271d43157bc9a2cdffee504d9"],["/undefined/Hash/Hash/index.html","e381702c80c7add98ba9b2c4c7b3762e"],["/undefined/IDA-拯救世界/IDA-拯救世界/index.html","1d4acb813ae032cac8336fad378ab99c"],["/undefined/KD-Tree/KD-Tree/index.html","965c3fae0034b351e989311939cb6b0b"],["/undefined/Kru重构树/Kru重构树/index.html","4e301a98babd3f96e3dcb79fc2cbbeaa"],["/undefined/Last-Season-1-CSP/Last-Season-1-CSP/index.html","bf606b8717d27eaaff4483a8c3cbe011"],["/undefined/Luogu-Simu10/Luogu-Simu10/index.html","d8dca16c8a23da3de82aa2670582c15e"],["/undefined/Luogu-Simu4-T1/Luogu-Simu4-T1/index.html","9b7b19abe44e9f8e09d82fe8911a9c83"],["/undefined/Luogu-Simu4-T2/Luogu-Simu4-T2/index.html","5908b551a9067db0f9f26413e4dd59d4"],["/undefined/Luogu-Simu5-T1/Luogu-Simu5-T1/index.html","4e0463281a8005e3f14aa5721e1d7f53"],["/undefined/Luogu-Simu5-T3/Luogu-Simu5-T3/index.html","64c39ed23d194b50f160c95e8fb6b42b"],["/undefined/Luogu-Simu5-T4/Luogu-Simu5-T4/index.html","fe3613c145154a434701edac83de8d8d"],["/undefined/Luogu-Simu6-T1/Luogu-Simu6-T1/index.html","3dbd8778877be1ce613b770b0b95a05d"],["/undefined/Luogu-Simu6-T2/Luogu-Simu6-T2/index.html","4ccfd7bf823b68c5f5e1838bb3204d22"],["/undefined/Luogu-Simu6-T3/Luogu-Simu6-T3/index.html","dda4dc1b096fa0abb31d6cbf04004ce6"],["/undefined/Luogu-Simu7-T3/Luogu-Simu7-T3/index.html","acd274a06a22a2af6af970193d90920b"],["/undefined/Luogu-Simu7-T4/Luogu-Simu7-T4/index.html","62f14ecbc0e52f9323bd79b16f540e75"],["/undefined/Luogu-Simu8-T1/Luogu-Simu8-T1/index.html","3344e8b73cc1df6d7841f3f84f570181"],["/undefined/Luogu-Simu9-T2/Luogu-Simu9-T2/index.html","62ea40a1b06f85f31e1a12ef1ccdfdfa"],["/undefined/P2150-NOI2015-寿司晚宴 & P8292 [省选联考 2022] 卡牌/P2150-NOI2015-寿司晚宴/index.html","73f03a619a3ae561944a0542d43dbea4"],["/undefined/P2157-SDOI2009-学校食堂/P2157-SDOI2009-学校食堂/index.html","05e144ed57e462ab4cdb5c7ee6ee9983"],["/undefined/P2331-SCOI2005-最大子矩阵/P2331-SCOI2005-最大子矩阵/index.html","7eafcf6a8d7c27d5c878f670d3d9cc72"],["/undefined/P3253-JLOI2013-删除物品/P3253-JLOI2013-删除物品/index.html","ca2403300811c9a6697aef1062c66bd0"],["/undefined/P3551-POI2013-USU-Take-ou/P3551-POI2013-USU-Take-ou/index.html","416a8397dc1f0bf064c18c615cd84ddc"],["/undefined/P3668-USACO17OPEN-Modern-Art-2-G/P3668-USACO17OPEN-Modern-Art-2-G/index.html","b0f7ade851d197148e6eb73847652c1f"],["/undefined/P4824-USACO15FEB-Censoring-S/P4824-USACO15FEB-Censoring-S/index.html","dabc46f92a811913d087f5c325dd4ab9"],["/undefined/P4940-Portal2/P4940-Portal2/index.html","096190c5c786a113273bfc7e892347d6"],["/undefined/P5426-USACO19OPEN-Balancing-Inversions-G/P5426-USACO19OPEN-Balancing-Inversions-G/index.html","5255ecb39a376615a6065b3396db8adf"],["/undefined/P5522-yLOI2019-棠梨煎雪/P5522-yLOI2019-棠梨煎雪/index.html","b8bfabc7990a8b316b318b562c33d134"],["/undefined/P5835-USACO19DEC-Meetings-S/P5835-USACO19DEC-Meetings-S/index.html","ba37b967bf84b6a1fb2e25e0f80942f2"],["/undefined/P5978-CEOI2018-Global-warming/P5978-CEOI2018-Global-warming/index.html","674702396c9128a9ae11e8c20f933509"],["/undefined/P6064-USACO05JAN-Naptime-G/P6064-USACO05JAN-Naptime-G/index.html","a17fe1ed7e61065941672910e69b17da"],["/undefined/P6148-USACO20FEB-Swapity-Swapity-Swap-S/P6148-USACO20FEB-Swapity-Swapity-Swap-S/index.html","64983d631e34b068f041cb89350f354b"],["/undefined/P6381-『MdOI-R2』Odyssey/P6381-『MdOI-R2』Odyssey/index.html","27bd97c9a2c34d83a813a8a9aecfe4b3"],["/undefined/P7077-CSP-S2020-函数调用/P7077-CSP-S2020-函数调用/index.html","6fc70d1b2d0ca9e61b4527a68180bd5e"],["/undefined/P7108-移花接木/P7108-移花接木/index.html","b8401fbf123e189867876721b9779723"],["/undefined/P7249-BalticOI-2012-Day1-移动网络/P7249-BalticOI-2012-Day1-移动网络/index.html","d217f78d36a23b635db09fe9f9b57d57"],["/undefined/P7291-「EZEC-5」人赢-加强版/P7291-「EZEC-5」人赢-加强版/index.html","0a1fd7c74dedec074900713c854bce3c"],["/undefined/P7355-「PMOI-1」抽奖/P7355-「PMOI-1」抽奖/index.html","a34778d5b17c53dc0f3d2ff9719c646a"],["/undefined/P7789-COCI2016-2017-6-Sirni/P7789-COCI2016-2017-6-Sirni/index.html","c89d5aa9b986635ce131e131f38b0a19"],["/undefined/P7915-CSP-S-2021-回文/P7915-CSP-S-2021-回文/index.html","c24ec3ac125f8df9e62944cc8baa5997"],["/undefined/P8252-NOI-Online-2022-提高组-讨论/P8252-NOI-Online-2022-提高组-讨论/index.html","81480f52023e1dcc2efb578add32900a"],["/undefined/P8365-LNOI2022-吃/P8365-LNOI2022-吃/index.html","fffa7e84db4d05f198502c59a5b75382"],["/undefined/P8817-CSP-S-2022-假期计划/P8817-CSP-S-2022-假期计划/index.html","8e11eda4fd8690a5c8ae8e6992dc6be3"],["/undefined/P8905-USACO22DEC-Strongest-Friendship-Group-G/P8905-USACO22DEC-Strongest-Friendship-Group-G/index.html","a196c727b41c3f13ba96baa4e8b6ee7a"],["/undefined/P9019-USACO23JAN-Tractor-Paths-P/P9019-USACO23JAN-Tractor-Paths-P/index.html","1f92aaf2edde92b92d7b388fc811af12"],["/undefined/P9378-THUPC-2023-决赛-物理实验/P9378-THUPC-2023-决赛-物理实验/index.html","a61e7633c2c271b9a5042ca496c3cbc3"],["/undefined/P9437-『XYGOI-round1』一棵树/P9437-『XYGOI-round1』一棵树/index.html","04e48e8ef0b45e38e60b0dd5b7270b1c"],["/undefined/P9715-「QFOI-R1」头/P9715-「QFOI-R1」头/index.html","ef33a5a94a069919bf6a3b6693a2ff37"],["/undefined/P9745-「KDOI-06-S」树上异或/P9745-「KDOI-06-S」树上异或/index.html","02a06b619d6ee9851b9d857981c4c840"],["/undefined/P9753-CSP-S-2023-消消乐/P9753-CSP-S-2023-消消乐/index.html","a7305093d4863dce927c15235f316b04"],["/undefined/Solve/Solve/index.html","9f2f3420c9707f2461b1c5880bf781b2"],["/undefined/Tarjan-圆方树/Tarjan-圆方树/index.html","c082e4935e0a43ea46c3c6eae8b40910"],["/undefined/Vivia-主题相关/Vivia-主题相关/index.html","176f87283c29ec8e3551a7c900f5ce66"],["/undefined/cdq-分治/cdq-分治/index.html","4a2c219333f9ae6fc51fea6114ca2087"],["/undefined/hello-world/hello-world/index.html","31a97620fe10b16db1b851ec601c1b7d"],["/undefined/三分/三分/index.html","22ff4cb7001975b4e698e3bad33ec0be"],["/undefined/写于NOIP之后/写于NOIP之后/index.html","f8d0352f59830c603489241bfefc2f6b"],["/undefined/可持久化并查集/可持久化并查集/index.html","4d34f083d81b195b610d197419bf4e0a"],["/undefined/启发式合并/启发式合并/index.html","de15d0058d000aea632101f4af464d73"],["/undefined/基环树-Dp/基环树-Dp/index.html","acdba695264c5be6173d006ba7229aae"],["/undefined/定义/定义/index.html","73188d51c4eb2534141886c1cb504a21"],["/undefined/平衡树进阶操作/平衡树进阶操作/index.html","17400f5b1fcce7031bde040fcf8469c3"],["/undefined/建站ing/建站ing/index.html","31fcee4b47609eaf5bdb45615db18b07"],["/undefined/斜率优化-Dp/斜率优化-Dp/index.html","d11abb2ce908c4be4dd97b3eaf928df7"],["/undefined/最大流/最大流/index.html","0fe7380a8147fdefd1bff4f92c84117f"],["/undefined/最小割/最小割/index.html","acd18deade0dec1a83407d56f3d553fc"],["/undefined/杂题精选-Nov-1-Wildest-Dreams/杂题精选-Nov-1-Wildest-Dreams/index.html","d82144449e2848c090c8f8b582a2f9b0"],["/undefined/杂题精选-Oct-1-The-best-People-in-life-are-free/杂题精选-Oct-1-The-best-People-in-life-are-free/index.html","a36a7709b5f23eca49c72860941aa84d"],["/undefined/杂题精选-Oct-2-数据结构萌萌题/杂题精选-Oct-2-数据结构萌萌题/index.html","b5e00e1134fe90c35fe409edcda7663d"],["/undefined/树/树/index.html","320d769491e7b43158da1de3b5b5c443"],["/undefined/树上启发式合并/树上启发式合并/index.html","6502c61cae268bc64d9896b4873f70e5"],["/undefined/树剖/树剖/index.html","75f34777f6a4cd9990db7ee90b95aafc"],["/undefined/树套树/树套树/index.html","0f15842cda9aa3b018845a6f6de34709"],["/undefined/概率期望/概率期望/index.html","37522ee96cd3579dc419c4dc7aacfc04"],["/undefined/浅谈分治/浅谈分治/index.html","6de3ebae4f01619dbee8764013a938ad"],["/undefined/浅谈前后缀思想/浅谈前后缀思想/index.html","c20e01318b6134cd978b50fc79826223"],["/undefined/浅谈单调序列绝对值和最小化/浅谈单调序列绝对值和最小化/index.html","5041a2221e5c7ffc5caf2ca110920ed9"],["/undefined/浅谈博弈论/浅谈博弈论/index.html","88d2952707767f1de74b5601b6b0da72"],["/undefined/浅谈字符串/浅谈字符串/index.html","732e7cc16d44809dd038aee3d3b02b0a"],["/undefined/浅谈随机化/浅谈随机化/index.html","21b07c9951cfc324ae04d88e53ef831d"],["/undefined/浅谈随机堆/浅谈随机堆/index.html","c53f1ba601b2de3822162ee396cb5945"],["/undefined/浅谈集合选数前-k-大/浅谈集合选数前-k-大/index.html","36119c3abe1a1d7c77095708cec6fa69"],["/undefined/珂朵莉树/珂朵莉树/index.html","f978c5419706b7249c16fa918a54665f"],["/undefined/线性代数/线性代数/index.html","b7b0f1ca23d9cf849456f40d731d4ca6"],["/undefined/组合数学/组合数学/index.html","a89bae66880cb6f8e9ebdbb1eeca09c3"],["/undefined/网络流/网络流/index.html","649f8d84e473b87d30b61888e1882b65"],["/undefined/费用流/费用流/index.html","1b1308efaa13da32aa184c26742fb64b"],["/undefined/连续段-Dp/连续段-Dp/index.html","6643a831eda74abe3982b9451034340f"],["/undefined/鲜花-1/鲜花-1/index.html","2bbfcf8cabf7ed0da0c5c884800b0403"],["/webfonts/fa-brands-400.ttf","2f73c22e9ab02b8f923c9577fb267e3c"],["/webfonts/fa-duotone-900.ttf","5043107ed7dba7b22fea520507ffcbfa"],["/webfonts/fa-light-300.ttf","56720c95107daf1fc8c4e3efbde50d44"],["/webfonts/fa-regular-400.ttf","fba93793e177af4a2277e468db6e409f"],["/webfonts/fa-sharp-solid-900.ttf","258a4bbc66f0b3e34c28b4026816ec72"],["/webfonts/fa-solid-900.ttf","7b93722a98b0178b89cad243a020f45c"],["/webfonts/fa-thin-100.ttf","eedf47e45505ceb0798e86e80856a246"],["/webfonts/fa-v4compatibility.ttf","69ecd6a58b5b719735db6f4fbce1d48d"]];
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
