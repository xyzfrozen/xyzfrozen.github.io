/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/404.html","ed99fdf3562fa5a525b00cc8f0726889"],["/about/index.html","9f33ff082079600f62ab785f64f77619"],["/archives/2023/09/index.html","2a3a23d67e31ec53703f24c42b8918c8"],["/archives/2023/10/index.html","c425903c605c0461d16615616eb203a6"],["/archives/2023/11/index.html","8fc3e27e4792357f9690f0b946256118"],["/archives/2023/12/index.html","0504cd2c9c9c763fca09ae815e0f78e6"],["/archives/2023/index.html","1a686b444482df9c8e835dc0d79a24ac"],["/archives/index.html","fceb0ea2ac4e158d0738548bee0b8bfd"],["/assets/build/styles.css","e8355bd1bbe04a2377568c4a407119f4"],["/assets/hbe.style.css","c94ef63e0056de67b35bf1385cd23136"],["/assets/odometer-theme-minimal.css","d50a198c326f1767cdaecdb7c67b392d"],["/categories/ideas/index.html","5e9f89d2fe83df6e3e8cb36adc54c099"],["/categories/index.html","ae2d6001d335eb7a8b2b19c182cb4585"],["/categories/note/index.html","ccd6a93418851a6249fbe466ed29b97c"],["/categories/note/page/2/index.html","dc740710e8f56de57db21f09f53e3b18"],["/categories/note/page/3/index.html","3e5c485d66127187d6dccca1b2ca5314"],["/categories/note/page/4/index.html","b00bf76c0cd8ee194e17aa97882ed3e6"],["/categories/note/page/5/index.html","f206c9047db57dbe6e7bfc4f9b79fd10"],["/categories/problem/index.html","bded2a334365d86994f7311fd448f932"],["/categories/problem/page/2/index.html","6811159c37f5255c18aca15b5f8ab4d1"],["/categories/problem/page/3/index.html","58e275534ed1651ea894e0b2f1017055"],["/categories/problem/page/4/index.html","b2a4a554762ccbceb27cdd483b0fda8c"],["/categories/problem/page/5/index.html","1bd915f418153d68a990e51f0655c5d5"],["/categories/problem/page/6/index.html","34794cc7d35a5763b1bd5385e43fe2ec"],["/categories/technology/index.html","2b5976062edfacb95c530da2facb583b"],["/categories/杂谈/index.html","2c455e2344b55fd9586ca5a481180434"],["/categories/碎碎念/index.html","f3b80e2f2e21a32b2faeeb0931fded4f"],["/css/common/animated.css","b2aecba9b34c3593d241f2c118a98ae1"],["/css/common/basic.css","7f0ff1d77c9c5fb76023ff1779d9e98f"],["/css/common/codeblock/code-block.css","641572522f017055b703ba651693e89b"],["/css/common/codeblock/code-theme.css","a0ebfd1c37296db7537a252a6eb4ba71"],["/css/common/codeblock/highlight.css","047bfc2a102adb26a67d26d6cfb370de"],["/css/common/markdown.css","0f093295106a47da4a5bf33ed123c1a4"],["/css/common/redefine-theme.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/common/variables.css","cc6a286463eb421ebd870763d97fe051"],["/css/hbe.style.css","c94ef63e0056de67b35bf1385cd23136"],["/css/layout/archive-content.css","d41d8cd98f00b204e9800998ecf8427e"],["/css/layout/article-content.css","7794e8a50e47703216223fe2c2f83c1b"],["/css/layout/category-content.css","4e0b84217a0d3632750ae6bf0d56ba6f"],["/css/layout/category-list.css","cd856dcc7f0daded2dad18b6ff213707"],["/css/layout/home-content.css","9b8e2b763443ab72cc5ce715a6a5fb3d"],["/css/layout/home-sidebar.css","16d12a6625e4a18ee2bc52ee096e8ba2"],["/css/layout/page.css","8ed1350276654c632042b3dd96cce1ad"],["/css/layout/tag-content.css","e792ee43f1efd78cfa3dbd9044969b4f"],["/css/style.css","f651539842db99d600bbb99ddd4f4924"],["/fontawesome/all.min.css","9ec513d705ed7f4deb2b50bb05914817"],["/fontawesome/brands.min.css","40960f6969b87896c9889de920787ae8"],["/fontawesome/duotone.min.css","6d17219d846a2851c2ed490a62dd38cb"],["/fontawesome/fontawesome.min.css","7f252c83010f3cada47ee6a6f71d1ee8"],["/fontawesome/light.min.css","99d663cdb4567e9c0c000fc52c670fb8"],["/fontawesome/regular.min.css","020abce5e17082f0f18f92aed092c0b0"],["/fontawesome/sharp-solid.min.css","20abfb823fecc8a6a73458c5edd394f9"],["/fontawesome/solid.min.css","f484f18056587df321165f744e9ba571"],["/fontawesome/svg-with-js.min.css","c40530bda390deaaed914c49f34d9e1e"],["/fontawesome/thin.min.css","f44cae780bf8a7287221c340cbe4d815"],["/fontawesome/v4-font-face.min.css","52325430f1fa7f983a32f712ebb59b3a"],["/fontawesome/v4-shims.min.css","4d764578be067a44af663d56be333195"],["/fontawesome/v5-font-face.min.css","1cb7f16555da63aecd2828d3d3130d85"],["/fonts/Chillax/Chillax-Variable.eot","f8ea7af333c768147f674ba526612248"],["/fonts/Chillax/Chillax-Variable.ttf","5f13274ffe3e1ee77b67324cb1a9cf7c"],["/fonts/Chillax/Chillax-Variable.woff","16fee1e0f2e5db01ad15ce4535ad39e2"],["/fonts/Chillax/chillax.css","0d2090517a2cb42f32bd86454b2bb1e0"],["/fonts/Satoshi/Satoshi-Variable.eot","f953920d265c265d55029a0044a7b122"],["/fonts/Satoshi/Satoshi-Variable.ttf","bc0207192e408b721fa14151690c6a66"],["/fonts/Satoshi/Satoshi-Variable.woff","bd7cac4b844318aa2b2f168b57b45c22"],["/fonts/Satoshi/Satoshi-VariableItalic.eot","9888965098b0fe3121439e5293e5f63d"],["/fonts/Satoshi/Satoshi-VariableItalic.ttf","db98db5c0d84369d2586aaf5eedc3376"],["/fonts/Satoshi/Satoshi-VariableItalic.woff","aa09c255fd899a8d89fc4636c0c9db4d"],["/fonts/Satoshi/satoshi.css","1baa156aca1baa1b570089def9ee55ec"],["/fonts/fonts.css","c96283423d2ff104322986b7338b3eba"],["/fonts/noto-sans-sc-v26-chinese-simplified-700.woff","3575965a87411920b48f5bd97b38810d"],["/fonts/noto-sans-sc-v26-chinese-simplified-regular.woff","0ed89b72b63509b506025450c77bfe43"],["/fonts/ubuntu-mono-v15-latin-regular.woff","86bd37776667f31cd9c6d0a2a9fa7ef5"],["/image/Violet 1.jpg","eb023ca433bc1de215c0a0d15fd1d616"],["/image/author.jpg","44d0486db9384c602d929f1ec2f519f9"],["/images/loading.svg","e1de41eda143447d3b338e77f7ace18f"],["/images/redefine-avatar.svg","fd210fedbfe357f35c570f61b943481b"],["/images/redefine-favicon.svg","badc8db1a4c3d1845db4e4ffec333d9e"],["/images/redefine-logo.svg","80a88fff4a3bb50559543e80477aa571"],["/index.html","2e131342cf5c7e7295c4dda6298a3d6a"],["/js/layouts/categoryList.js","be8705c55bfaa476c5cf3fd995409305"],["/js/layouts/lazyload.js","728031a7240822da29d5bd927d1e1727"],["/js/layouts/navbarShrink.js","43a834b08201e6db83de9c56ea05d4b6"],["/js/layouts/toc.js","cb98abb318dc0eda4bac6ec6d43faf10"],["/js/libs/APlayer.min.js","8f1017e7a73737e631ff95fa51e4e7d7"],["/js/libs/Swup.min.js","9ff02a08a69fe4addbd9af33359deabf"],["/js/libs/SwupPreloadPlugin.min.js","170c2637b152f61a7225171523b9e5f3"],["/js/libs/SwupProgressPlugin.min.js","f9eb5c6b192ac1dcd18b12666a647fd0"],["/js/libs/SwupScriptsPlugin.min.js","30935c9aeeb587c49d2e30c28f57c5e7"],["/js/libs/SwupScrollPlugin.min.js","85fe68c41c48170dd104ee4f29690798"],["/js/libs/SwupSlideTheme.min.js","2b1d521e1b83b5ffc073ad31045e682a"],["/js/libs/Typed.min.js","f68641147185cbded4b38b4900a20f40"],["/js/libs/anime.min.js","864a144dbbc956381a47679ec57ab06c"],["/js/libs/mermaid.min.js","07d4a62ba2e5b0e44077bd9b481fd75d"],["/js/libs/minimasonry.min.js","a3b6453136c8edd4fdd374171f022ffa"],["/js/libs/odometer.min.js","519a5777444f5965b6df23e26c69f037"],["/js/libs/pjax.min.js","d810aff16a7f45392bdeec5493ebee8e"],["/js/main.js","295801b1c2b4f7fd1d85f34fadc94805"],["/js/plugins/aplayer.js","13934c08bc9325eaad918b497d1216fd"],["/js/plugins/hbe.js","e3e4ff16a0beaa851e3926b5d26079c7"],["/js/plugins/masonry.js","5a2fb5815ba12e2efb0323a526dc623f"],["/js/plugins/mermaid.js","929a9284ea999064bc6842d28bf9f102"],["/js/plugins/tabs.js","a6eca0aaba3fd4a5cb8539b129d742cf"],["/js/plugins/typed.js","b3456d138a26a01d00f06e4fcc0a0477"],["/js/tools/codeBlock.js","187983273eb159f9fab0f4bb8d4d02c3"],["/js/tools/imageViewer.js","c6e3a4bbd5ee5fbe51806092601127f9"],["/js/tools/lightDarkSwitch.js","ab6260f82f3916594294df5ff3e86c94"],["/js/tools/localSearch.js","d9ecf11b97c82251978084566e399426"],["/js/tools/runtime.js","87f27761db6f7a197f99739804ee0c1d"],["/js/tools/scrollTopBottom.js","d984b4612439ba4d47813e1dd1bf46f2"],["/js/tools/tocToggle.js","cd72e98af728161a67fa6b2df9b28d5a"],["/js/utils.js","0cb3343ba95bde5bb08690b6b49b6c5d"],["/lib/hbe.js","e3e4ff16a0beaa851e3926b5d26079c7"],["/page/10/index.html","35a796ac0eb9b6a017c09f2265f60aad"],["/page/11/index.html","9c5227f31024990e8c13a03c6f63bc67"],["/page/2/index.html","fea445d19c698bdaedd3c0422fb038f7"],["/page/3/index.html","8389a13caa1bb01830307b8f046f940e"],["/page/4/index.html","6298f93498e2578020cee44b627dffc3"],["/page/5/index.html","97cb9d10dcd6749c800302cfb65231bb"],["/page/6/index.html","edd42fd7c38792d4f2679d3ed9708d46"],["/page/7/index.html","fe823f0c5c6ed3ccdd7393b6d549c4e8"],["/page/8/index.html","325d85df4e23b6a3ce19d19c1b86483c"],["/page/9/index.html","e88e9578e1cc6f03a6a744b3f23235d9"],["/sw-register.js","9b090ecdcd72dda20607e9d5803e5678"],["/tags/2-SAt/index.html","8105f105d512d81dbcd321bc43870ec2"],["/tags/Fhq/index.html","55728c86890ec89cdd39f4204ecf55da"],["/tags/Hash/index.html","010ff820b64552a1fe9611c878dc2180"],["/tags/IDA/index.html","4b75d76da4a9e8cee742fea95d74455f"],["/tags/KD-Tree/index.html","3d2fa284c44d684c16d3e8e272ff9668"],["/tags/KMP/index.html","b0a0fc2700006bab4bfa332c3158e921"],["/tags/Kru-重构树/index.html","128f6e90b4daf09e5fd76c55e921997f"],["/tags/Kru重构树/index.html","75836337f52918e1cde41a18ae00bc38"],["/tags/LCA/index.html","5866f8c3d0f2b8a8b63a5577ecffad6f"],["/tags/LCP/index.html","482ec2b4b4d3fb8b39999058608fa84a"],["/tags/MST/index.html","3544afc3134dc0c046ff5bd28a3a18d6"],["/tags/Tarjan/index.html","e0761cc7b29df6d4a5bdc935190000c0"],["/tags/Topsort/index.html","5c9d59110c404e1fe4ad33a9ace9ece5"],["/tags/Trie/index.html","c1c2014602220e91a5f594250412ea14"],["/tags/index.html","f95ebc396ef6f0d2ba1b8e6291d9a0db"],["/tags/三分/index.html","74af0d68ef96031cbe5da9696b9e6798"],["/tags/二分/index.html","3675310aedb39b52b3eb414d8a1c3b72"],["/tags/二分图/index.html","e50c333d923f1168342c7212cffc5e40"],["/tags/二维数点/index.html","a23b0b4c4024652fcd0361ce98cdd969"],["/tags/众数/index.html","cad6fe763d80c40b509fda1b030be152"],["/tags/倍增/index.html","939ea073474ab8f48638c47b7598e69a"],["/tags/偏序/index.html","c425a50e676248b6cec223412879e5f1"],["/tags/分治/index.html","d7bf0dd99be47c5843793785deef6306"],["/tags/前缀和/index.html","d5d129d1ce8551af866c29300f0a25b3"],["/tags/动态开点/index.html","56d0ec187b3846157e50a5a26f32715c"],["/tags/动态开点权值线段树/index.html","e91da42d8dcac2c84bbd2b159d346419"],["/tags/区间-Dp/index.html","e9311174a7992583f26cbfa206150022"],["/tags/博弈论/index.html","0a42032e3000c8f84f555c14281741ee"],["/tags/双指针/index.html","53a344dd24f3749c75229b73fcddec08"],["/tags/双端队列/index.html","9e9b72a1adb605d0afafe5ff8690d921"],["/tags/可持久化/index.html","1570b871cc81bf3d3a31c8d4cb457092"],["/tags/可持久化平衡树/index.html","0c9557258dafcafddad2134425385ece"],["/tags/可持久化并查集/index.html","114eaf7fa3cccab4f9309ee1f7557015"],["/tags/可持久化线段树/index.html","265ae94a4eb47a1569a2cc50cee50785"],["/tags/启发式合并/index.html","000a9d69b28b71dadcc93da4a9549297"],["/tags/图论/index.html","30a3b36bd91befdbf87a27abd0454f72"],["/tags/圆方树/index.html","126764bdeba49017f84554fc6f103827"],["/tags/均摊分析/index.html","ad06b1fb37fcc8618e709aa7807887d7"],["/tags/基环树/index.html","1411b640a7ced59f8d03ea55ae820873"],["/tags/堆/index.html","1f3751d5baddf948fba0a09bbf2b9dc0"],["/tags/复杂度分析/index.html","f2b3e5b503a62af1e0e0cd46da671e76"],["/tags/复杂度均摊/index.html","68ef629c7dcb2b06c5206edd7786b9c3"],["/tags/字符串/index.html","e3991341c7f989272d29db9b1492f0bb"],["/tags/容斥/index.html","6f7bff3dbacf66c9edd7c1b9d4124e5e"],["/tags/容斥原理/index.html","750401264289a85ee0ee69483f04ab25"],["/tags/对顶栈/index.html","f3e02b9205797ff74339108f1706fefe"],["/tags/平衡树/index.html","e97199864c858ecaa635ecf25bf5e0ba"],["/tags/并查集/index.html","2fd0cacc2ecd164daec9598b9316c0a0"],["/tags/归并排序/index.html","c577dba4a324ad09f05519f126fd4fbf"],["/tags/循环节/index.html","03d462748f588933983ee8a34535aaac"],["/tags/思维/index.html","0bda4f4190da3d1344abe7cb061db92a"],["/tags/思维/page/2/index.html","cc0f656bc4160067683666adfa0fc325"],["/tags/思维/page/3/index.html","bb8e85483633f2ab0cbea1ee6fc9e435"],["/tags/换根-Dp/index.html","42dff1e89c313569faa921326db6b673"],["/tags/搜索/index.html","dc44fb5a8a95efbd6352d4187be82fe0"],["/tags/数学/index.html","5bd328ab670b8012ccd66c055e6c3947"],["/tags/数学/page/2/index.html","65023f96b62f54e163c059f35fdbdcf3"],["/tags/数据结构/index.html","a95794be6cef34f5f6ecbb15a2fc7b7a"],["/tags/整体二分/index.html","d56f5aa4caa2291f930e912d35debb39"],["/tags/斜率优化-Dp/index.html","82d1ffeedbcd2a32fe1671be585d26a3"],["/tags/最大流/index.html","ceec3fb1c7db2051e5db83c384e1b89b"],["/tags/最小割/index.html","592a9ff6cce75decb2025c632d3887b8"],["/tags/最小生成树/index.html","a7a81f9d87027ab993c5afd37394b92b"],["/tags/最短路/index.html","ce756f30dd874b839cad8ade17f59de1"],["/tags/期望/index.html","02e930038f29e1b381aaa9ba20b3b0c3"],["/tags/杂谈/index.html","ffafb7acc6f8c85b556608fb4edd3139"],["/tags/权值线段树/index.html","a062c7785bc800f1372aa27cffe6cef4"],["/tags/栈/index.html","22669ff3a6f1fb24179e6cd3b5def038"],["/tags/树剖/index.html","d1b1b92ea6b129d371ccc01a10823e0c"],["/tags/树套树/index.html","da50bac23f67c0adca8e4ec27bf075fb"],["/tags/树形-Dp/index.html","fc4f8b16aaf7a52ad759dbb592fc72ec"],["/tags/树状数组/index.html","ea53c806f2993d9c0ee0cbab6d9da13d"],["/tags/根号分治/index.html","572eabe5314f74eea6d0697733d8207e"],["/tags/概率/index.html","a82dc3d286bba2fd2f5af8c4c5d6e049"],["/tags/状压-Dp/index.html","ff5914ef758091a2ed60c1fb3ac3f5fe"],["/tags/状态压缩/index.html","b6ddaa66df7a53324169c242ec334ae1"],["/tags/珂朵莉树/index.html","6d81448fd815f2138d4627c327168855"],["/tags/矩阵/index.html","5dfe60ccbd57e78b9f515452f7913f44"],["/tags/碰撞/index.html","675aba1006f5091f8387c6eb26c4d87d"],["/tags/线性-Dp/index.html","6fa4cd9bcbdcce111aae2988d1f85b3b"],["/tags/线性-Dp/page/2/index.html","97bd7248031c517e313e4850b22ce42a"],["/tags/线段树/index.html","2cd822a6f9efb7349ecee8effa9cd5f6"],["/tags/线段树/page/2/index.html","c5a7849d4ad39b2b2747d86bc536c0ce"],["/tags/线段树二分/index.html","251c5124e9a342a84930c9359143a867"],["/tags/线段树合并/index.html","eb054cf66974d7b530fb8c68d1a66169"],["/tags/组合数学/index.html","ebad44586dd24af649a22431edc728bc"],["/tags/网络流/index.html","ce9b2d5bbea9792d7876772ab25cf502"],["/tags/置换环/index.html","30a14f194c5ef6e6e92e31a299952442"],["/tags/莫队/index.html","625898796bc2aadf34c4c24128cbf5fa"],["/tags/贪心/index.html","e35bcf70505fa0cfe7f9b2772529167f"],["/tags/费用流/index.html","8e29ee14fba8c1d43fb17fe87280d824"],["/tags/轮廓线-Dp/index.html","ffbecf549dc1b528d69633aab83e3b1c"],["/tags/连续段-Dp/index.html","0fa093ccbb39d7102c71d1a3df67daf3"],["/tags/逆序对/index.html","34b2162488c677ee071726742b16fd55"],["/tags/随机化/index.html","4e64397470752b172b1119864f9ab025"],["/tags/高斯消元/index.html","2f359ca2809a60b27c28798ab13878c7"],["/undefined/2-SAT/2-SAT/index.html","c70fdd8a89d991815728c15dac8e3d62"],["/undefined/ABC248-F/ABC248-F/index.html","f2ce389cea60b8eed58550bbe42296e6"],["/undefined/ABC277-G/ABC277-G/index.html","f5acb7c17ce477aecaf72ba0da423809"],["/undefined/AT-dp-y/AT-dp-y/index.html","9ad25f84534fb3178e8f97f0d7509642"],["/undefined/Boruvka/Boruvka/index.html","e5595681ded2def267c0d73564198688"],["/undefined/CF1876/CF1876/index.html","acbe5cc9bca22971d6f2238a0fb50549"],["/undefined/CF27E-Number-With-The-Given-Amount-Of-Divisors/CF27E-Number-With-The-Given-Amount-Of-Divisors/index.html","49f6cc4523527d7d67b13cb3ba3c6e8b"],["/undefined/CF708C-Centroids/CF708C-Centroids/index.html","33e39f026dd122950e9232aeebe75e21"],["/undefined/Dfn序-欧拉序/Dfn序-欧拉序/index.html","0e502506b7e4dc27edd0d6cee6e3f696"],["/undefined/EXSTL-Pbds/EXSTL-Pbds/index.html","84a5719563517893ccf443bc210b2cac"],["/undefined/EXSTL-Rope/EXSTL-Rope/index.html","d6b2144bfb270630da49087fea3b73f2"],["/undefined/Extra-树状数组/Extra-树状数组/index.html","7a6f6b39678ee7c8c011acd0d720906a"],["/undefined/Extra-线段树-优化建图/Extra-线段树-优化建图/index.html","729de5d6acca62d54ffd2be430bf7032"],["/undefined/Extra-线段树-动态开点 && 权值线段树/Extra-线段树-动态开点 && 权值线段树/index.html","65ebe3594b48b3433aeffafc55900c87"],["/undefined/Extra-线段树-线段树合并/Extra-线段树-线段树合并/index.html","7182c7d05b4de5fbfa194673383468bb"],["/undefined/Hash/Hash/index.html","a53199da5e345c52267b86cb7a7f8f61"],["/undefined/IDA-拯救世界/IDA-拯救世界/index.html","9b67471344b31b133c2695821b856db3"],["/undefined/KD-Tree/KD-Tree/index.html","4d4267fbca160a4108f8472c32786edb"],["/undefined/Kru重构树/Kru重构树/index.html","cab2a9fc618dee2e3376c53a797854b6"],["/undefined/Last-Season-1-CSP/Last-Season-1-CSP/index.html","5a5d59f03b77fce39cd8848d7d96c487"],["/undefined/Luogu-Simu10/Luogu-Simu10/index.html","361d7d9305e3ed6d6d0db56b9a3c6fae"],["/undefined/Luogu-Simu4-T1/Luogu-Simu4-T1/index.html","3bd12ba7d2ff78545bf3d4c285f721c2"],["/undefined/Luogu-Simu4-T2/Luogu-Simu4-T2/index.html","343cb328d0c797f3f738fc034f0835c7"],["/undefined/Luogu-Simu5-T1/Luogu-Simu5-T1/index.html","76e6ea817ec660b517ddcdf65d75c78f"],["/undefined/Luogu-Simu5-T3/Luogu-Simu5-T3/index.html","fbe763a76df831605119be0a4e4d1091"],["/undefined/Luogu-Simu5-T4/Luogu-Simu5-T4/index.html","1642fb33ba04ec940d9dedb7ede59554"],["/undefined/Luogu-Simu6-T1/Luogu-Simu6-T1/index.html","9f880672747a5659d64cb16abdc99352"],["/undefined/Luogu-Simu6-T2/Luogu-Simu6-T2/index.html","83f18df70670220f704803a54ee37957"],["/undefined/Luogu-Simu6-T3/Luogu-Simu6-T3/index.html","707903f0b2eab99bd16e0f6b06152a62"],["/undefined/Luogu-Simu7-T3/Luogu-Simu7-T3/index.html","908373ce4f0c9201f61bca0bf4dd386b"],["/undefined/Luogu-Simu7-T4/Luogu-Simu7-T4/index.html","126f43600ebfc9a482065723d5f47290"],["/undefined/Luogu-Simu8-T1/Luogu-Simu8-T1/index.html","1552e959821046b3bed0e2aaa9dc0a45"],["/undefined/Luogu-Simu9-T2/Luogu-Simu9-T2/index.html","a065dc2f26d40bdb618be6e46eef502a"],["/undefined/P2150-NOI2015-寿司晚宴 & P8292 [省选联考 2022] 卡牌/P2150-NOI2015-寿司晚宴/index.html","22b5f957e52f67fcf53fee095c923432"],["/undefined/P2157-SDOI2009-学校食堂/P2157-SDOI2009-学校食堂/index.html","a718ac3a2f7be8da987c39b7dc0ac7bd"],["/undefined/P2331-SCOI2005-最大子矩阵/P2331-SCOI2005-最大子矩阵/index.html","d419f6341093e080b633d4c7b14c51ee"],["/undefined/P3253-JLOI2013-删除物品/P3253-JLOI2013-删除物品/index.html","1a693bb28913715bf5c863a00004f5f0"],["/undefined/P3551-POI2013-USU-Take-ou/P3551-POI2013-USU-Take-ou/index.html","ff0dd7c0e343eb49210f390dfd4cbd20"],["/undefined/P3668-USACO17OPEN-Modern-Art-2-G/P3668-USACO17OPEN-Modern-Art-2-G/index.html","964cdf5c7d0608db725c15c20b66a72c"],["/undefined/P4824-USACO15FEB-Censoring-S/P4824-USACO15FEB-Censoring-S/index.html","3611373bf838df8d3bbf09133287c94d"],["/undefined/P4940-Portal2/P4940-Portal2/index.html","3177b35258caf9623c46a9de2f88bde3"],["/undefined/P5426-USACO19OPEN-Balancing-Inversions-G/P5426-USACO19OPEN-Balancing-Inversions-G/index.html","9fdeb826f4d4721e85e8996f4204c297"],["/undefined/P5522-yLOI2019-棠梨煎雪/P5522-yLOI2019-棠梨煎雪/index.html","1bef18079d37ae3b797b2e809d5f7f85"],["/undefined/P5835-USACO19DEC-Meetings-S/P5835-USACO19DEC-Meetings-S/index.html","cf65164d6ad1f075475529acd05ca782"],["/undefined/P5978-CEOI2018-Global-warming/P5978-CEOI2018-Global-warming/index.html","7dd5a11a624531b7f8efa9fab1334482"],["/undefined/P6064-USACO05JAN-Naptime-G/P6064-USACO05JAN-Naptime-G/index.html","b64a4af344f7889212e59655d9c1f22e"],["/undefined/P6148-USACO20FEB-Swapity-Swapity-Swap-S/P6148-USACO20FEB-Swapity-Swapity-Swap-S/index.html","b7957684222db2d0d49149e10596f310"],["/undefined/P6381-『MdOI-R2』Odyssey/P6381-『MdOI-R2』Odyssey/index.html","0cb14d569319d26791518341d5adc72c"],["/undefined/P7077-CSP-S2020-函数调用/P7077-CSP-S2020-函数调用/index.html","4b567c687fd039c457ac376a920f6af8"],["/undefined/P7108-移花接木/P7108-移花接木/index.html","ea37d8c6ccf668a0e7a71a80ab6aac2b"],["/undefined/P7249-BalticOI-2012-Day1-移动网络/P7249-BalticOI-2012-Day1-移动网络/index.html","0fd4153d093cc8b5170f3f80c9da5cf3"],["/undefined/P7291-「EZEC-5」人赢-加强版/P7291-「EZEC-5」人赢-加强版/index.html","a4f35ae0400add4ba8370dda78ff1b54"],["/undefined/P7355-「PMOI-1」抽奖/P7355-「PMOI-1」抽奖/index.html","4de4ea8ff4644dfae6ced90c0cde0e29"],["/undefined/P7789-COCI2016-2017-6-Sirni/P7789-COCI2016-2017-6-Sirni/index.html","a57149b9636f6bf4aa378f394c682f01"],["/undefined/P7915-CSP-S-2021-回文/P7915-CSP-S-2021-回文/index.html","830f0cc384c727aff0668e4a402cc024"],["/undefined/P8252-NOI-Online-2022-提高组-讨论/P8252-NOI-Online-2022-提高组-讨论/index.html","76e177242ece8e5398c8fdce398a23d2"],["/undefined/P8365-LNOI2022-吃/P8365-LNOI2022-吃/index.html","95cc30cee362b1701a1b81a9bb6cfff6"],["/undefined/P8817-CSP-S-2022-假期计划/P8817-CSP-S-2022-假期计划/index.html","dc7aa2a0c18762b92b2c3f91d7ae584d"],["/undefined/P8905-USACO22DEC-Strongest-Friendship-Group-G/P8905-USACO22DEC-Strongest-Friendship-Group-G/index.html","c2c50e6a23f7074233bd5c83896d9f52"],["/undefined/P9019-USACO23JAN-Tractor-Paths-P/P9019-USACO23JAN-Tractor-Paths-P/index.html","b5aa815759d7fc2e4f66a4133b1ea2c4"],["/undefined/P9378-THUPC-2023-决赛-物理实验/P9378-THUPC-2023-决赛-物理实验/index.html","0d4ecdfbf89d29d6be5f23d96b00f885"],["/undefined/P9437-『XYGOI-round1』一棵树/P9437-『XYGOI-round1』一棵树/index.html","14f198ba7bb612d060a186dbd4f937c6"],["/undefined/P9715-「QFOI-R1」头/P9715-「QFOI-R1」头/index.html","0a6d602c18a2740eb9e5433f0cc331a3"],["/undefined/P9745-「KDOI-06-S」树上异或/P9745-「KDOI-06-S」树上异或/index.html","54e3b6998d94617412c9351330864d5f"],["/undefined/P9753-CSP-S-2023-消消乐/P9753-CSP-S-2023-消消乐/index.html","25330df819bc67bd9790bf60729da7fb"],["/undefined/Solve/Solve/index.html","4dc80ab353f8caa600d74d55d4781b25"],["/undefined/Tarjan-圆方树/Tarjan-圆方树/index.html","4a0395c62bee6dfff27ae458def297b8"],["/undefined/Vivia-主题相关/Vivia-主题相关/index.html","fe636a94471fe76dc213ac919bb89cc0"],["/undefined/cdq-分治/cdq-分治/index.html","05b929a5a1e5eb4b2f75d9b96549a347"],["/undefined/hello-world/hello-world/index.html","26f20b288ad869886a29ec4125970a4f"],["/undefined/三分/三分/index.html","f85a10764e693952a50f8a892ce9975a"],["/undefined/写于NOIP之后/写于NOIP之后/index.html","f454bb75c47219082a24184e04cc40df"],["/undefined/可持久化并查集/可持久化并查集/index.html","9b1a285c9987fda65ad4cb9365af57c1"],["/undefined/启发式合并/启发式合并/index.html","514639bdafd0d5d489e7e6340299b0e8"],["/undefined/基环树-Dp/基环树-Dp/index.html","195eed206010a6b725591749e9f7005d"],["/undefined/定义/定义/index.html","349e7dac2003372c6ebd1b1da1b507a9"],["/undefined/平衡树进阶操作/平衡树进阶操作/index.html","091efdd0e0cfe4d80e09e685e4801445"],["/undefined/建站ing/建站ing/index.html","ff5a01408bd9c7c5fad68cd3d215ab52"],["/undefined/斜率优化-Dp/斜率优化-Dp/index.html","378f50d717ed4bcf5b529587f0d35530"],["/undefined/最大流/最大流/index.html","b214d3523615573049bb99fc62b13ee6"],["/undefined/最小割/最小割/index.html","5532fe5a168b2ba94c8152533f031615"],["/undefined/杂题精选-Nov-1-Wildest-Dreams/杂题精选-Nov-1-Wildest-Dreams/index.html","f94b7f156c9a4f8349e5a1d1f8836227"],["/undefined/杂题精选-Oct-1-The-best-People-in-life-are-free/杂题精选-Oct-1-The-best-People-in-life-are-free/index.html","b0e7887f965d0b33086b86510b7605c1"],["/undefined/杂题精选-Oct-2-数据结构萌萌题/杂题精选-Oct-2-数据结构萌萌题/index.html","418daf3d5e86c6279793e42f011cb183"],["/undefined/树/树/index.html","a75c986a2df2c2bd8d2a3a24e56839c7"],["/undefined/树上启发式合并/树上启发式合并/index.html","df6a2774391ea5d57a2ea6472efdf416"],["/undefined/树剖/树剖/index.html","c7ffe875fe557d0b97bb84e907a5c60e"],["/undefined/树套树/树套树/index.html","18c394ec61bee6b9e5e767abe72d3088"],["/undefined/概率期望/概率期望/index.html","8c4d6d18da76ae9d661f338c9cac0e36"],["/undefined/浅谈分治/浅谈分治/index.html","7965c05614b7c3f7b17422522b7a55da"],["/undefined/浅谈前后缀思想/浅谈前后缀思想/index.html","cf26ecb4bb647c9fc22707e31445603c"],["/undefined/浅谈单调序列绝对值和最小化/浅谈单调序列绝对值和最小化/index.html","e7906805baa946777d0e6535b5425818"],["/undefined/浅谈博弈论/浅谈博弈论/index.html","ce3756642f51e0132af1b162fb044acf"],["/undefined/浅谈字符串/浅谈字符串/index.html","0c34bc719e25a287f4d097d55dcaec7f"],["/undefined/浅谈随机化/浅谈随机化/index.html","e12791999488f8089d6687947415917b"],["/undefined/浅谈随机堆/浅谈随机堆/index.html","61ffd003f105d55e2c6976cb88b89c4f"],["/undefined/浅谈集合选数前-k-大/浅谈集合选数前-k-大/index.html","38efb6c4d3f3248e5b2f88a2bc1635a7"],["/undefined/珂朵莉树/珂朵莉树/index.html","cc09ac9369bc87412dc2a7cc12835ca2"],["/undefined/线性代数/线性代数/index.html","a2522541204c71d40c1fe942f9e6386f"],["/undefined/组合数学/组合数学/index.html","e156ad310e5a6f96bb7428cb493bad8a"],["/undefined/网络流/网络流/index.html","f7a29bf4641d639f04e54a48401a501f"],["/undefined/费用流/费用流/index.html","5212e72b73a69d82343b092707fe7ce4"],["/undefined/连续段-Dp/连续段-Dp/index.html","1e7ff071531e59d9861790a8f503cb83"],["/undefined/鲜花-1/鲜花-1/index.html","b7740d78f9168854051af9f192966e48"],["/webfonts/fa-brands-400.ttf","2f73c22e9ab02b8f923c9577fb267e3c"],["/webfonts/fa-duotone-900.ttf","5043107ed7dba7b22fea520507ffcbfa"],["/webfonts/fa-light-300.ttf","56720c95107daf1fc8c4e3efbde50d44"],["/webfonts/fa-regular-400.ttf","fba93793e177af4a2277e468db6e409f"],["/webfonts/fa-sharp-solid-900.ttf","258a4bbc66f0b3e34c28b4026816ec72"],["/webfonts/fa-solid-900.ttf","7b93722a98b0178b89cad243a020f45c"],["/webfonts/fa-thin-100.ttf","eedf47e45505ceb0798e86e80856a246"],["/webfonts/fa-v4compatibility.ttf","69ecd6a58b5b719735db6f4fbce1d48d"]];
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
