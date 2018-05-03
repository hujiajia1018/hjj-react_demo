export const ajaxurl = process.env.NODE_ENV=='test' ? 'http://pre.stu.hongyunbang.net' : process.env.NODE_ENV=='production' ? 'http://stu.hongyunbang.net' : 'http://dev.stu.hongyunbang.net';
export const uploadImg = (process.env.NODE_ENV=='test' || process.env.NODE_ENV=='production') ? 'http://identity-1253496728.pictj.myqcloud.com/' : 'http://dev-1253496728.pictj.myqcloud.com/';
export const downbapp = 'www.hongyunbang.net';
export const yingyongbao = process.env.NODE_ENV=='test' ? {
  position : 'http://pre.stu.hongyunbang.net/sharepage/positionshare.html',
  company : '' 
} : process.env.NODE_ENV=='production' ? {
  position : 'http://stu.hongyunbang.net/sharepage/positionshare.html',
  company : '' 
} : {
  position : 'http://dev.stu.hongyunbang.net/sharepage/positionshare.html',
  company : ''
};
export const fankui = {
  "0" : "产品建议",
  "1" : "信息纠错",
  "2" : "内容举报",
  "3" : "程序问题",
  "4" : "视觉风格"
};
export const sex = {
  "0" : "不限",
  "1" : "男",
  "2" : "女"
};
export const kaoshi = {
  "0" : "笔试",
  "1" : "面试"
};
/*export const ksresult = {
  "0" : "笔试拒绝",
  "1" : "面试拒绝",
  "2" : "录用拒绝",
  "3" : "录用接受"
};*/
export const ksresult = {
  "0" : "已处理",
  "1" : "已处理",
  "2" : "录用拒绝",
  "3" : "录用接受"
};
export const showday = {
  "0" : "刚刚发布",
  "1" : "1天前发布",
  "2" : "2天前发布",
  "3" : "3天前发布",
  "4" : "4天前发布",
  "5" : "5天前发布",
  "6" : "6天前发布",
  "7" : "7天前发布",
  "8" : "8天前发布",
  "9" : "9天前发布",
  "10" : "10天前发布",
  "11" : "11天前发布",
  "12" : "12天前发布",
  "13" : "13天前发布",
  "14" : "14天前发布",
  "15" : "15天前发布",
  "16" : "16天前发布",
  "17" : "17天前发布",
  "18" : "18天前发布",
  "19" : "19天前发布",
  "20" : "20天前发布",
  "21" : "21天前发布",
  "22" : "22天前发布",
  "23" : "23天前发布",
  "24" : "24天前发布",
  "25" : "25天前发布",
  "26" : "26天前发布",
  "27" : "27天前发布",
  "28" : "28天前发布",
  "29" : "29天前发布",
  "30" : "30天前发布"
};
export const mianshi = {
  "0" : "未投递",
  "1" : "已投递",
  "2" : "被查看",
  "3" : "通过初筛",
  "4" : "笔试邀请",
  "5" : "待笔试",
  "6" : "已笔试",
  "7" : "拒绝笔试",
  "8" : "面试邀请",
  "9" : "待面试",
  "10" : "已面试",
  "11" : "拒绝面试",
  "12" : "录用邀请",
  "13" : "接受录用",
  "14" : "拒绝录用"
};
export const xueli = {
  "0" : "不限",
  "1" : "大专",
  "2" : "本科",
  "3" : "硕士",
  "4" : "博士"
};
export const xingshi = {
  "0" : "现场",
  "1" : "直播",
  "2" : "现场 + 直播"
};
export const zhuanye = {
  "111" : {
    "id" : "111",
    "name" : "不限",
    "level" : 1,
    "order" : 0,
    "leaf" :true,
    "children" : {
      "111111" : {
        "id" : "111111",
        "name" : "不限",
        "level" : 2,
        "order" : 0,
        "leaf" :true,
        "parent_id" : "111"
      }
    },
    "parent_id" : "0"
  },
  "000" : {
    "id" : "000",
    "name" : "哲学",
    "level" : 1,
    "order" : 0,
    "leaf" : false,
    "children" : {
      "000000" : {
        "id" : "000000",
        "name" : "哲学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "000"
      }
    },
    "parent_id" : "0"
  },
  "001" : {
    "id" : "001",
    "name" : "经济学",
    "level" : 1,
    "order" : 0,
    "leaf" : false,
    "children" : {
      "001000" : {
        "id" : "001000",
        "name" : "经济学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "001"
      },
      "001001" : {
        "id" : "001001",
        "name" : "财政学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "001"
      },
      "001002" : {
        "id" : "001002",
        "name" : "保险相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "001"
      },
      "001003" : {
        "id" : "001003",
        "name" : "金融相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "001"
      },
      "001004" : {
        "id" : "001004",
        "name" : "贸易相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "001"
      }
    },
    "parent_id" : "0"
  },
  "002" : {
    "id" : "002",
    "name" : "法学",
    "level" : 1,
    "order" : 0,
    "leaf" : false,
    "children" : {
      "002000" : {
        "id" : "002000",
        "name" : "法学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "002"
      },
      "002001" : {
        "id" : "002001",
        "name" : "马克思主义理论相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "002"
      },
      "002002" : {
        "id" : "002002",
        "name" : "社会学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "002"
      },
      "002003" : {
        "id" : "002003",
        "name" : "政治学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "002"
      },
      "002004" : {
        "id" : "002004",
        "name" : "公安学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "002"
      }
    },
    "parent_id" : "0"
  },
  "003" : {
    "id" : "003",
    "name" : "教育学",
    "level" : 1,
    "order" : 0,
    "leaf" : false,
    "children" : {
      "003000" : {
        "id" : "003000",
        "name" : "教育学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "003"
      },
      "003001" : {
        "id" : "003001",
        "name" : "小学教育相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "003"
      },
      "003002" : {
        "id" : "003002",
        "name" : "艺术教育相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "003"
      },
      "003003" : {
        "id" : "003003",
        "name" : "人文教育相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "003"
      },
      "003004" : {
        "id" : "003004",
        "name" : "科学教育相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "003"
      },
      "003005" : {
        "id" : "003005",
        "name" : "社会教育相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "003"
      },
      "003006" : {
        "id" : "003006",
        "name" : "体育学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "003"
      }
    },
    "parent_id" : "0"
  },
  "004" : {
    "id" : "004",
    "name" : "文学",
    "level" : 1,
    "order" : 0,
    "leaf" : false,
    "children" : {
      "004000" : {
        "id" : "004000",
        "name" : "中国语言文学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "004"
      },
      "004001" : {
        "id" : "004001",
        "name" : "英语相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "004"
      },
      "004002" : {
        "id" : "004002",
        "name" : "俄语相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "004"
      },
      "004003" : {
        "id" : "004003",
        "name" : "德语相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "004"
      },
      "004004" : {
        "id" : "004004",
        "name" : "法语相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "004"
      },
      "004005" : {
        "id" : "004005",
        "name" : "西班牙语相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "004"
      },
      "004006" : {
        "id" : "004006",
        "name" : "阿拉伯语相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "004"
      },
      "004007" : {
        "id" : "004007",
        "name" : "日语相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "004"
      },
      "004008" : {
        "id" : "004008",
        "name" : "韩语相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "004"
      },
      "004009" : {
        "id" : "004009",
        "name" : "葡萄牙语相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "004"
      },
      "004010" : {
        "id" : "004010",
        "name" : "意大利语相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "004"
      },
      "004011" : {
        "id" : "004011",
        "name" : "其他外国语言文学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "004"
      },
      "004012" : {
        "id" : "004012",
        "name" : "新闻传播学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "004"
      },
      "004013" : {
        "id" : "004013",
        "name" : "艺术相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "004"
      }
    },
    "parent_id" : "0"
  },
  "005" : {
    "id" : "005",
    "name" : "历史学",
    "level" : 1,
    "order" : 0,
    "leaf" : false,
    "children" : {
      "005000" : {
        "id" : "005000",
        "name" : "历史学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "005"
      }
    },
    "parent_id" : "0"
  },
  "006" : {
    "id" : "006",
    "name" : "理学",
    "level" : 1,
    "order" : 0,
    "leaf" : false,
    "children" : {
      "006000" : {
        "id" : "006000",
        "name" : "数学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "006"
      },
      "006001" : {
        "id" : "006001",
        "name" : "物理学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "006"
      },
      "006002" : {
        "id" : "006002",
        "name" : "化学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "006"
      },
      "006003" : {
        "id" : "006003",
        "name" : "地理科学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "006"
      },
      "006004" : {
        "id" : "006004",
        "name" : "生物科学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "006"
      },
      "006005" : {
        "id" : "006005",
        "name" : "地球物理学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "006"
      },
      "006006" : {
        "id" : "006006",
        "name" : "大气科学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "006"
      },
      "006007" : {
        "id" : "006007",
        "name" : "海洋科学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "006"
      },
      "006008" : {
        "id" : "006008",
        "name" : "力学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "006"
      },
      "006009" : {
        "id" : "006009",
        "name" : "电子相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "006"
      },
      "006010" : {
        "id" : "006010",
        "name" : "信息科学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "006"
      },
      "006011" : {
        "id" : "006011",
        "name" : "材料科学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "006"
      },
      "006012" : {
        "id" : "006012",
        "name" : "环境科学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "006"
      },
      "006013" : {
        "id" : "006013",
        "name" : "心理学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "006"
      },
      "006014" : {
        "id" : "006014",
        "name" : "统计学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "006"
      },
      "006015" : {
        "id" : "006015",
        "name" : "天文学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "006"
      },
      "006016" : {
        "id" : "006016",
        "name" : "地质学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "006"
      },
      "006017" : {
        "id" : "006017",
        "name" : "系统科学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "006"
      }
    },
    "parent_id" : "0"
  },
  "007" : {
    "id" : "007",
    "name" : "工学",
    "level" : 1,
    "order" : 0,
    "leaf" : false,
    "children" : {
      "007000" : {
        "id" : "007000",
        "name" : "地矿相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "007"
      },
      "007001" : {
        "id" : "007001",
        "name" : "材料相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "007"
      },
      "007002" : {
        "id" : "007002",
        "name" : "机械相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "007"
      },
      "007003" : {
        "id" : "007003",
        "name" : "仪器仪表相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "007"
      },
      "007004" : {
        "id" : "007004",
        "name" : "能源动力相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "007"
      },
      "007005" : {
        "id" : "007005",
        "name" : "电气工程相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "007"
      },
      "007006" : {
        "id" : "007006",
        "name" : "信息工程相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "007"
      },
      "007007" : {
        "id" : "007007",
        "name" : "网络工程相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "007"
      },
      "007008" : {
        "id" : "007008",
        "name" : "通信工程相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "007"
      },
      "007009" : {
        "id" : "007009",
        "name" : "电子工程相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "007"
      },
      "007010" : {
        "id" : "007010",
        "name" : "计算机相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "007"
      },
      "007011" : {
        "id" : "007011",
        "name" : "土建相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "007"
      },
      "007012" : {
        "id" : "007012",
        "name" : "水利相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "007"
      },
      "007013" : {
        "id" : "007013",
        "name" : "测绘相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "007"
      },
      "007014" : {
        "id" : "007014",
        "name" : "环境与安全相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "007"
      },
      "007015" : {
        "id" : "007015",
        "name" : "化工与制药相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "007"
      },
      "007016" : {
        "id" : "007016",
        "name" : "交通运输相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "007"
      },
      "007017" : {
        "id" : "007017",
        "name" : "海洋工程相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "007"
      },
      "007018" : {
        "id" : "007018",
        "name" : "轻工纺织食品相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "007"
      },
      "007019" : {
        "id" : "007019",
        "name" : "航空航天相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "007"
      },
      "007020" : {
        "id" : "007020",
        "name" : "武器相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "007"
      },
      "007021" : {
        "id" : "007021",
        "name" : "工程力学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "007"
      },
      "007022" : {
        "id" : "007022",
        "name" : "生物工程相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "007"
      },
      "007023" : {
        "id" : "007023",
        "name" : "农业工程相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "007"
      },
      "007024" : {
        "id" : "007024",
        "name" : "林业工程相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "007"
      },
      "007025" : {
        "id" : "007025",
        "name" : "公安技术相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "007"
      },
      "007026" : {
        "id" : "007026",
        "name" : "光电相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "007"
      },
      "007027" : {
        "id" : "007027",
        "name" : "电力电子相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "007"
      },
      "007028" : {
        "id" : "007028",
        "name" : "生物医学工程相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "007"
      }
    },
    "parent_id" : "0"
  },
  "008" : {
    "id" : "008",
    "name" : "农学",
    "level" : 1,
    "order" : 0,
    "leaf" : false,
    "children" : {
      "008000" : {
        "id" : "008000",
        "name" : "植物生产相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "008"
      },
      "008001" : {
        "id" : "008001",
        "name" : "草业科学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "008"
      },
      "008002" : {
        "id" : "008002",
        "name" : "森林资源相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "008"
      },
      "008003" : {
        "id" : "008003",
        "name" : "环境生态相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "008"
      },
      "008004" : {
        "id" : "008004",
        "name" : "动物生产相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "008"
      },
      "008005" : {
        "id" : "008005",
        "name" : "动物医学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "008"
      },
      "008006" : {
        "id" : "008006",
        "name" : "水产相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "008"
      }
    },
    "parent_id" : "0"
  },
  "009" : {
    "id" : "009",
    "name" : "医学",
    "level" : 1,
    "order" : 0,
    "leaf" : false,
    "children" : {
      "009000" : {
        "id" : "009000",
        "name" : "基础医学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "009"
      },
      "009001" : {
        "id" : "009001",
        "name" : "预防医学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "009"
      },
      "009002" : {
        "id" : "009002",
        "name" : "临床医学与医学技术相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "009"
      },
      "009003" : {
        "id" : "009003",
        "name" : "口腔医学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "009"
      },
      "009004" : {
        "id" : "009004",
        "name" : "中医学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "009"
      },
      "009005" : {
        "id" : "009005",
        "name" : "法医学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "009"
      },
      "009006" : {
        "id" : "009006",
        "name" : "护理学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "009"
      },
      "009007" : {
        "id" : "009007",
        "name" : "药学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "009"
      },
      "009008" : {
        "id" : "009008",
        "name" : "放射医学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "009"
      },
      "009009" : {
        "id" : "009009",
        "name" : "医学影像学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "009"
      }
    },
    "parent_id" : "0"
  },
  "010" : {
    "id" : "010",
    "name" : "管理学",
    "level" : 1,
    "order" : 0,
    "leaf" : false,
    "children" : {
      "010000" : {
        "id" : "010000",
        "name" : "管理科学与工程相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "010"
      },
      "010001" : {
        "id" : "010001",
        "name" : "工商管理相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "010"
      },
      "010002" : {
        "id" : "010002",
        "name" : "市场营销相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "010"
      },
      "010003" : {
        "id" : "010003",
        "name" : "财会管理相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "010"
      },
      "010004" : {
        "id" : "010004",
        "name" : "人力资源管理相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "010"
      },
      "010005" : {
        "id" : "010005",
        "name" : "旅游管理相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "010"
      },
      "010006" : {
        "id" : "010006",
        "name" : "电子商务相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "010"
      },
      "010007" : {
        "id" : "010007",
        "name" : "物流管理相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "010"
      },
      "010008" : {
        "id" : "010008",
        "name" : "物业管理相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "010"
      },
      "010009" : {
        "id" : "010009",
        "name" : "公共管理相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "010"
      },
      "010010" : {
        "id" : "010010",
        "name" : "农业经纪管理相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "010"
      },
      "010011" : {
        "id" : "010011",
        "name" : "图书档案学相关类",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "parent_id" : "010"
      }
    },
    "parent_id" : "0"
  }
};
export const guimo = {
  "0": "不限",           
  "1": "0-20人",
  "2": "20-99人",
  "3": "100-499人",
  "4": "500-999人",
  "5": "1000-9999人",
  "6": "10000人以上"
};
export const rongzi = {
  "0": "不限",           
  "1": "未融资",
  "2": "天使轮",
  "3": "A轮",
  "4": "B轮",
  "5": "C轮",
  "6": "D轮及以上",
  "7": "已上市",
  "8": "不需要融资"
};
export const hangye = {
  "002" : "O2O",
  "001" : "金融",
  "003" : "游戏",
  "005" : "通信",
  "007" : "汽车",
  "004" : "媒体",
  "000" : "旅游",
  "006" : "IT软件",
  "008" : "互联网",
  "018" : "企业服务",
  "011" : "广告营销",
  "019" : "社交网络",
  "021" : "公关会展",
  "009" : "生活服务",
  "012" : "数据服务",
  "013" : "智能硬件",
  "014" : "文化娱乐",
  "015" : "网络招聘",
  "020" : "教育培训",
  "022" : "健康医疗",
  "010" : "信息安全",
  "016" : "分类信息",
  "017" : "电子商务",
  "023" : "采购/贸易",
  "024" : "移动互联网",
  "025" : "房地产/建筑",
  "026" : "供应链/物流",
  "028" : "非互联网行业",
  "027" : "咨询/翻译/法律"
};
export const zhiwei = {
  "000" : {
    "id" : "000",
    "name" : "IT/互联网/通信",
    "level" : 1,
    "order" : 0,
    "leaf" : false,
    "children" : {
      "000000" : {
        "id" : "000000",
        "name" : "软件开发/系统集成",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "000000000" : {
            "id" : "000000000",
            "name" : "软件工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000000"
          },
          "000000001" : {
            "id" : "000000001",
            "name" : "需求工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000000"
          },
          "000000002" : {
            "id" : "000000002",
            "name" : "系统架构设计师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000000"
          },
          "000000003" : {
            "id" : "000000003",
            "name" : "系统分析员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000000"
          },
          "000000004" : {
            "id" : "000000004",
            "name" : "数据库开发工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000000"
          },
          "000000005" : {
            "id" : "000000005",
            "name" : "ERP技术/开发应用",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000000"
          },
          "000000006" : {
            "id" : "000000006",
            "name" : "互联网软件工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000000"
          },
          "000000007" : {
            "id" : "000000007",
            "name" : "手机软件开发工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000000"
          },
          "000000008" : {
            "id" : "000000008",
            "name" : "嵌入式软件开发",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000000"
          },
          "000000009" : {
            "id" : "000000009",
            "name" : "移动互联网开发",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000000"
          },
          "000000010" : {
            "id" : "000000010",
            "name" : "WEB前端开发",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000000"
          },
          "000000011" : {
            "id" : "000000011",
            "name" : "语音/视频/图形开发",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000000"
          },
          "000000012" : {
            "id" : "000000012",
            "name" : "用户界面(UI)设计",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000000"
          },
          "000000013" : {
            "id" : "000000013",
            "name" : "用户体验（UE/UX)设计",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000000"
          },
          "000000014" : {
            "id" : "000000014",
            "name" : "网页设计/美工",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000000"
          },
          "000000015" : {
            "id" : "000000015",
            "name" : "游戏设计/开发",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000000"
          },
          "000000016" : {
            "id" : "000000016",
            "name" : "游戏策划",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000000"
          },
          "000000017" : {
            "id" : "000000017",
            "name" : "游戏界面设计",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000000"
          },
          "000000018" : {
            "id" : "000000018",
            "name" : "系统集成工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000000"
          },
          "000000019" : {
            "id" : "000000019",
            "name" : "算法工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000000"
          },
          "000000020" : {
            "id" : "000000020",
            "name" : "仿真应用工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000000"
          },
          "000000021" : {
            "id" : "000000021",
            "name" : "计算机辅助设计师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000000"
          },
          "000000022" : {
            "id" : "000000022",
            "name" : "网站架构设计师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000000"
          },
          "000000023" : {
            "id" : "000000023",
            "name" : "IOS开发工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000000"
          },
          "000000024" : {
            "id" : "000000024",
            "name" : "Android开发工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000000"
          },
          "000000025" : {
            "id" : "000000025",
            "name" : "Java开发工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000000"
          },
          "000000026" : {
            "id" : "000000026",
            "name" : "PHP开发工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000000"
          },
          "000000027" : {
            "id" : "000000027",
            "name" : "C语言开发工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000000"
          },
          "000000028" : {
            "id" : "000000028",
            "name" : "脚本开发工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000000"
          },
          "000000029" : {
            "id" : "000000029",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000000"
          }
        },
        "parent_id" : "000"
      },
      "000001" : {
        "id" : "000001",
        "name" : "计算机硬件",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "000001000" : {
            "id" : "000001000",
            "name" : "硬件工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000001"
          },
          "000001001" : {
            "id" : "000001001",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000001"
          }
        },
        "parent_id" : "000"
      },
      "000002" : {
        "id" : "000002",
        "name" : "人工智能",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "000002000" : {
            "id" : "000002000",
            "name" : "机器学习",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000002"
          },
          "000002001" : {
            "id" : "000002001",
            "name" : "图像算法",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000002"
          },
          "000002002" : {
            "id" : "000002002",
            "name" : "深度学习",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000002"
          },
          "000002003" : {
            "id" : "000002003",
            "name" : "图像处理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000002"
          },
          "000002004" : {
            "id" : "000002004",
            "name" : "语音识别",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000002"
          },
          "000002005" : {
            "id" : "000002005",
            "name" : "图像识别",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000002"
          }
        },
        "parent_id" : "000"
      },
      "000003" : {
        "id" : "000003",
        "name" : "互联网产品/运营",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "000003000" : {
            "id" : "000003000",
            "name" : "互联网产品经理/专员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000003"
          },
          "000003001" : {
            "id" : "000003001",
            "name" : "电子商务经理/专员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000003"
          },
          "000003002" : {
            "id" : "000003002",
            "name" : "运营经理/专员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000003"
          },
          "000003003" : {
            "id" : "000003003",
            "name" : "网站编辑",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000003"
          },
          "000003004" : {
            "id" : "000003004",
            "name" : "SEO/SEM",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000003"
          },
          "000003005" : {
            "id" : "000003005",
            "name" : "新媒体运营",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000003"
          },
          "000003006" : {
            "id" : "000003006",
            "name" : "产品运营",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000003"
          },
          "000003007" : {
            "id" : "000003007",
            "name" : "数据运营",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000003"
          },
          "000003008" : {
            "id" : "000003008",
            "name" : "市场运营",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000003"
          },
          "000003009" : {
            "id" : "000003009",
            "name" : "内容运营",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000003"
          },
          "000003010" : {
            "id" : "000003010",
            "name" : "活动运营",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000003"
          },
          "000003011" : {
            "id" : "000003011",
            "name" : "网店店长",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000003"
          },
          "000003012" : {
            "id" : "000003012",
            "name" : "网店推广",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000003"
          },
          "000003013" : {
            "id" : "000003013",
            "name" : "网店客服",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000003"
          },
          "000003014" : {
            "id" : "000003014",
            "name" : "网店运营",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000003"
          },
          "000003015" : {
            "id" : "000003015",
            "name" : "网店管理员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000003"
          },
          "000003016" : {
            "id" : "000003016",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000003"
          }
        },
        "parent_id" : "000"
      },
      "000004" : {
        "id" : "000004",
        "name" : "运维/技术支持",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "000004000" : {
            "id" : "000004000",
            "name" : "运维工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000004"
          },
          "000004001" : {
            "id" : "000004001",
            "name" : "IT技术支持",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000004"
          },
          "000004002" : {
            "id" : "000004002",
            "name" : "网络工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000004"
          },
          "000004003" : {
            "id" : "000004003",
            "name" : "网络管理员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000004"
          },
          "000004004" : {
            "id" : "000004004",
            "name" : "数据库管理员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000004"
          },
          "000004005" : {
            "id" : "000004005",
            "name" : "网络与信息安全工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000004"
          },
          "000004006" : {
            "id" : "000004006",
            "name" : "运维开发工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000004"
          },
          "000004007" : {
            "id" : "000004007",
            "name" : "系统工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000004"
          },
          "000004008" : {
            "id" : "000004008",
            "name" : "系统管理员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000004"
          },
          "000004009" : {
            "id" : "000004009",
            "name" : "ERP实施顾问",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000004"
          },
          "000004010" : {
            "id" : "000004010",
            "name" : "IT技术文员/助理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000004"
          },
          "000004011" : {
            "id" : "000004011",
            "name" : "IT文档工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000004"
          },
          "000004012" : {
            "id" : "000004012",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000004"
          }
        },
        "parent_id" : "000"
      },
      "000005" : {
        "id" : "000005",
        "name" : "项目管理",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "000005000" : {
            "id" : "000005000",
            "name" : "信息技术专员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000005"
          },
          "000005001" : {
            "id" : "000005001",
            "name" : "项目主管",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000005"
          },
          "000005002" : {
            "id" : "000005002",
            "name" : "项目执行/协调人员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000005"
          },
          "000005003" : {
            "id" : "000005003",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000005"
          }
        },
        "parent_id" : "000"
      },
      "000006" : {
        "id" : "000006",
        "name" : "IT质量管理/测试",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "000006000" : {
            "id" : "000006000",
            "name" : "IT质量管理工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000006"
          },
          "000006001" : {
            "id" : "000006001",
            "name" : "系统测试",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000006"
          },
          "000006002" : {
            "id" : "000006002",
            "name" : "软件测试",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000006"
          },
          "000006003" : {
            "id" : "000006003",
            "name" : "硬件测试",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000006"
          },
          "000006004" : {
            "id" : "000006004",
            "name" : "配置管理工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000006"
          },
          "000006005" : {
            "id" : "000006005",
            "name" : "信息技术标准化工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000006"
          },
          "000006006" : {
            "id" : "000006006",
            "name" : "标准化工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000006"
          },
          "000006007" : {
            "id" : "000006007",
            "name" : "游戏测试",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000006"
          },
          "000006008" : {
            "id" : "000006008",
            "name" : "手机维修",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000006"
          },
          "000006009" : {
            "id" : "000006009",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000006"
          }
        },
        "parent_id" : "000"
      },
      "000007" : {
        "id" : "000007",
        "name" : "通信技术开发及应用",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "000007000" : {
            "id" : "000007000",
            "name" : "通信技术工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000007"
          },
          "000007001" : {
            "id" : "000007001",
            "name" : "有线传输工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000007"
          },
          "000007002" : {
            "id" : "000007002",
            "name" : "无线通信工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000007"
          },
          "000007003" : {
            "id" : "000007003",
            "name" : "电信交换工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000007"
          },
          "000007004" : {
            "id" : "000007004",
            "name" : "数据通信工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000007"
          },
          "000007005" : {
            "id" : "000007005",
            "name" : "移动通信工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000007"
          },
          "000007006" : {
            "id" : "000007006",
            "name" : "电信网络工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000007"
          },
          "000007007" : {
            "id" : "000007007",
            "name" : "通信电源工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000007"
          },
          "000007008" : {
            "id" : "000007008",
            "name" : "增值产品开发工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000007"
          },
          "000007009" : {
            "id" : "000007009",
            "name" : "手机软件开发工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000007"
          },
          "000007010" : {
            "id" : "000007010",
            "name" : "其他 ",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "000007"
          }
        },
        "parent_id" : "000"
      }
    },
    "parent_id" : "0"
  },
  "001" : {
    "id" : "001",
    "name" : "销售/客服/市场",
    "level" : 1,
    "order" : 0,
    "leaf" : false,
    "children" : {
      "001000" : {
        "id" : "001000",
        "name" : "销售业务",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "001000000" : {
            "id" : "001000000",
            "name" : "大客户销售",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001000"
          },
          "001000001" : {
            "id" : "001000001",
            "name" : "销售代表",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001000"
          },
          "001000002" : {
            "id" : "001000002",
            "name" : "渠道/分销专员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001000"
          },
          "001000003" : {
            "id" : "001000003",
            "name" : "客户代表",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001000"
          },
          "001000004" : {
            "id" : "001000004",
            "name" : "销售工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001000"
          },
          "001000005" : {
            "id" : "001000005",
            "name" : "电话销售",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001000"
          },
          "001000006" : {
            "id" : "001000006",
            "name" : "网络/在线销售",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001000"
          },
          "001000007" : {
            "id" : "001000007",
            "name" : "团购业务员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001000"
          },
          "001000008" : {
            "id" : "001000008",
            "name" : "会籍顾问",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001000"
          },
          "001000009" : {
            "id" : "001000009",
            "name" : "招商经理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001000"
          },
          "001000010" : {
            "id" : "001000010",
            "name" : "销售助理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001000"
          },
          "001000011" : {
            "id" : "001000011",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001000"
          }
        },
        "parent_id" : "001"
      },
      "001001" : {
        "id" : "001001",
        "name" : "销售行政及商务",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "001001000" : {
            "id" : "001001000",
            "name" : "销售行政专员/助理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001001"
          },
          "001001001" : {
            "id" : "001001001",
            "name" : "业务分析专员/助理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001001"
          },
          "001001002" : {
            "id" : "001001002",
            "name" : "销售培训师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001001"
          },
          "001001003" : {
            "id" : "001001003",
            "name" : "商务专员/助理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001001"
          },
          "001001004" : {
            "id" : "001001004",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001001"
          }
        },
        "parent_id" : "001"
      },
      "001002" : {
        "id" : "001002",
        "name" : "客服及支持",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "001002000" : {
            "id" : "001002000",
            "name" : "客服专员/助理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001002"
          },
          "001002001" : {
            "id" : "001002001",
            "name" : "售前/售后技术支持",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001002"
          },
          "001002002" : {
            "id" : "001002002",
            "name" : "咨询热线/呼叫中心服务",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001002"
          },
          "001002003" : {
            "id" : "001002003",
            "name" : "网络/在线客服",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001002"
          },
          "001002004" : {
            "id" : "001002004",
            "name" : "投诉专员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001002"
          },
          "001002005" : {
            "id" : "001002005",
            "name" : "VIP专员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001002"
          },
          "001002006" : {
            "id" : "001002006",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001002"
          }
        },
        "parent_id" : "001"
      },
      "001003" : {
        "id" : "001003",
        "name" : "公关/媒介",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "001003000" : {
            "id" : "001003000",
            "name" : "公关专员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001003"
          },
          "001003001" : {
            "id" : "001003001",
            "name" : "会务/会展专员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001003"
          },
          "001003002" : {
            "id" : "001003002",
            "name" : "媒介专员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001003"
          },
          "001003003" : {
            "id" : "001003003",
            "name" : "公关/媒介助理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001003"
          },
          "001003004" : {
            "id" : "001003004",
            "name" : "媒介销售",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001003"
          },
          "001003005" : {
            "id" : "001003005",
            "name" : "活动策划",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001003"
          },
          "001003006" : {
            "id" : "001003006",
            "name" : "活动执行",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001003"
          },
          "001003007" : {
            "id" : "001003007",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001003"
          }
        },
        "parent_id" : "001"
      },
      "001004" : {
        "id" : "001004",
        "name" : "市场/营销",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "001004000" : {
            "id" : "001004000",
            "name" : "市场/营销/拓展专员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001004"
          },
          "001004001" : {
            "id" : "001004001",
            "name" : "市场助理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001004"
          },
          "001004002" : {
            "id" : "001004002",
            "name" : "市场分析/调研人员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001004"
          },
          "001004003" : {
            "id" : "001004003",
            "name" : "产品/品牌专员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001004"
          },
          "001004004" : {
            "id" : "001004004",
            "name" : "市场通路专员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001004"
          },
          "001004005" : {
            "id" : "001004005",
            "name" : "市场企划专员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001004"
          },
          "001004006" : {
            "id" : "001004006",
            "name" : "促销主管/督导",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001004"
          },
          "001004007" : {
            "id" : "001004007",
            "name" : "促销员/导购",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001004"
          },
          "001004008" : {
            "id" : "001004008",
            "name" : "选址拓展/新店开发",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001004"
          },
          "001004009" : {
            "id" : "001004009",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001004"
          }
        },
        "parent_id" : "001"
      },
      "001005" : {
        "id" : "001005",
        "name" : "广告/会展",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "001005000" : {
            "id" : "001005000",
            "name" : "广告客户专员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001005"
          },
          "001005001" : {
            "id" : "001005001",
            "name" : "广告创意/设计专员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001005"
          },
          "001005002" : {
            "id" : "001005002",
            "name" : "广告制作执行",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001005"
          },
          "001005003" : {
            "id" : "001005003",
            "name" : "美术指导",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001005"
          },
          "001005004" : {
            "id" : "001005004",
            "name" : "文案/策划",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001005"
          },
          "001005005" : {
            "id" : "001005005",
            "name" : "会展策划/设计",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001005"
          },
          "001005006" : {
            "id" : "001005006",
            "name" : "会务经理/专员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001005"
          },
          "001005007" : {
            "id" : "001005007",
            "name" : "广告/会展项目管理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001005"
          },
          "001005008" : {
            "id" : "001005008",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "001005"
          }
        },
        "parent_id" : "001"
      }
    },
    "parent_id" : "0"
  },
  "002" : {
    "id" : "002",
    "name" : "金融",
    "level" : 1,
    "order" : 0,
    "leaf" : false,
    "children" : {
      "002000" : {
        "id" : "002000",
        "name" : "证券/期货/投资",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "002000000" : {
            "id" : "002000000",
            "name" : "证券/期货/外汇经纪人",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002000"
          },
          "002000001" : {
            "id" : "002000001",
            "name" : "证券分析师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002000"
          },
          "002000002" : {
            "id" : "002000002",
            "name" : "股票/期货操盘手",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002000"
          },
          "002000003" : {
            "id" : "002000003",
            "name" : "金融/经济研究员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002000"
          },
          "002000004" : {
            "id" : "002000004",
            "name" : "金融产品经理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002000"
          },
          "002000005" : {
            "id" : "002000005",
            "name" : "金融产品销售",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002000"
          },
          "002000006" : {
            "id" : "002000006",
            "name" : "投资/基金项目经理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002000"
          },
          "002000007" : {
            "id" : "002000007",
            "name" : "投资/理财顾问",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002000"
          },
          "002000008" : {
            "id" : "002000008",
            "name" : "投资银行业务",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002000"
          },
          "002000009" : {
            "id" : "002000009",
            "name" : "投资银行财务分析",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002000"
          },
          "002000010" : {
            "id" : "002000010",
            "name" : "融资专员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002000"
          },
          "002000011" : {
            "id" : "002000011",
            "name" : "风险管理/控制",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002000"
          },
          "002000012" : {
            "id" : "002000012",
            "name" : "拍卖/担保/典当业务",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002000"
          },
          "002000013" : {
            "id" : "002000013",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002000"
          }
        },
        "parent_id" : "002"
      },
      "002001" : {
        "id" : "002001",
        "name" : "银行",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "002001000" : {
            "id" : "002001000",
            "name" : "综合业务专员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002001"
          },
          "002001001" : {
            "id" : "002001001",
            "name" : "资产评估/分析",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002001"
          },
          "002001002" : {
            "id" : "002001002",
            "name" : "风险控制",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002001"
          },
          "002001003" : {
            "id" : "002001003",
            "name" : "信贷管理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002001"
          },
          "002001004" : {
            "id" : "002001004",
            "name" : "信审核查",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002001"
          },
          "002001005" : {
            "id" : "002001005",
            "name" : "进出口/信用证结算",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002001"
          },
          "002001006" : {
            "id" : "002001006",
            "name" : "外汇交易",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002001"
          },
          "002001007" : {
            "id" : "002001007",
            "name" : "清算人员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002001"
          },
          "002001008" : {
            "id" : "002001008",
            "name" : "客户经理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002001"
          },
          "002001009" : {
            "id" : "002001009",
            "name" : "信用卡销售",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002001"
          },
          "002001010" : {
            "id" : "002001010",
            "name" : "呼叫中心客服",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002001"
          },
          "002001011" : {
            "id" : "002001011",
            "name" : "银行柜员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002001"
          },
          "002001012" : {
            "id" : "002001012",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002001"
          }
        },
        "parent_id" : "002"
      },
      "002002" : {
        "id" : "002002",
        "name" : "保险",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "002002000" : {
            "id" : "002002000",
            "name" : "保险精算师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002002"
          },
          "002002001" : {
            "id" : "002002001",
            "name" : "保险产品开发/项目策划",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002002"
          },
          "002002002" : {
            "id" : "002002002",
            "name" : "保险经纪人/保险代理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002002"
          },
          "002002003" : {
            "id" : "002002003",
            "name" : "理财顾问/财务规划师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002002"
          },
          "002002004" : {
            "id" : "002002004",
            "name" : "保险电销",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002002"
          },
          "002002005" : {
            "id" : "002002005",
            "name" : "保险核保",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002002"
          },
          "002002006" : {
            "id" : "002002006",
            "name" : "保险理赔",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002002"
          },
          "002002007" : {
            "id" : "002002007",
            "name" : "保险客户服务/续期管理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002002"
          },
          "002002008" : {
            "id" : "002002008",
            "name" : "保险培训师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002002"
          },
          "002002009" : {
            "id" : "002002009",
            "name" : "保险内勤",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002002"
          },
          "002002010" : {
            "id" : "002002010",
            "name" : "契约管理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002002"
          },
          "002002011" : {
            "id" : "002002011",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002002"
          }
        },
        "parent_id" : "002"
      },
      "002003" : {
        "id" : "002003",
        "name" : "信托/拍卖",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "002003000" : {
            "id" : "002003000",
            "name" : "信托服务",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002003"
          },
          "002003001" : {
            "id" : "002003001",
            "name" : "担保服务",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002003"
          },
          "002003002" : {
            "id" : "002003002",
            "name" : "典当服务",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002003"
          },
          "002003003" : {
            "id" : "002003003",
            "name" : "拍卖师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002003"
          },
          "002003004" : {
            "id" : "002003004",
            "name" : "珠宝/收藏品鉴定",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "002003"
          }
        },
        "parent_id" : "002"
      }
    },
    "parent_id" : "0"
  },
  "003" : {
    "id" : "003",
    "name" : "生产/制造",
    "level" : 1,
    "order" : 0,
    "leaf" : false,
    "children" : {
      "003000" : {
        "id" : "003000",
        "name" : "生产/营运",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "003000000" : {
            "id" : "003000000",
            "name" : "项目工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003000"
          },
          "003000001" : {
            "id" : "003000001",
            "name" : "营运管理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003000"
          },
          "003000002" : {
            "id" : "003000002",
            "name" : "生产管理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003000"
          },
          "003000003" : {
            "id" : "003000003",
            "name" : "生产领班/组长",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003000"
          },
          "003000004" : {
            "id" : "003000004",
            "name" : "生产计划/物料管理(PMC)",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003000"
          },
          "003000005" : {
            "id" : "003000005",
            "name" : "生产文员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003000"
          },
          "003000006" : {
            "id" : "003000006",
            "name" : "设备管理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003000"
          },
          "003000007" : {
            "id" : "003000007",
            "name" : "化验员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003000"
          },
          "003000008" : {
            "id" : "003000008",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003000"
          }
        },
        "parent_id" : "003"
      },
      "003001" : {
        "id" : "003001",
        "name" : "质量安全",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "003001000" : {
            "id" : "003001000",
            "name" : "质量管理/测试工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003001"
          },
          "003001001" : {
            "id" : "003001001",
            "name" : "质量检验员/测试员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003001"
          },
          "003001002" : {
            "id" : "003001002",
            "name" : "可靠度工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003001"
          },
          "003001003" : {
            "id" : "003001003",
            "name" : "故障分析工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003001"
          },
          "003001004" : {
            "id" : "003001004",
            "name" : "认证工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003001"
          },
          "003001005" : {
            "id" : "003001005",
            "name" : "体系工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003001"
          },
          "003001006" : {
            "id" : "003001006",
            "name" : "审核员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003001"
          },
          "003001007" : {
            "id" : "003001007",
            "name" : "环境/健康/安全工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003001"
          },
          "003001008" : {
            "id" : "003001008",
            "name" : "安全员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003001"
          },
          "003001009" : {
            "id" : "003001009",
            "name" : "供应商管理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003001"
          },
          "003001010" : {
            "id" : "003001010",
            "name" : "采购材料/设备质量管理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003001"
          },
          "003001011" : {
            "id" : "003001011",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003001"
          }
        },
        "parent_id" : "003"
      },
      "003002" : {
        "id" : "003002",
        "name" : "工程/机械/能源",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "003002000" : {
            "id" : "003002000",
            "name" : "技术研发工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002001" : {
            "id" : "003002001",
            "name" : "产品工艺/制程工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002002" : {
            "id" : "003002002",
            "name" : "产品规划工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002003" : {
            "id" : "003002003",
            "name" : "项目管理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002004" : {
            "id" : "003002004",
            "name" : "实验室工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002005" : {
            "id" : "003002005",
            "name" : "工程/设备主管",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002006" : {
            "id" : "003002006",
            "name" : "工程/设备工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002007" : {
            "id" : "003002007",
            "name" : "工程/机械绘图员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002008" : {
            "id" : "003002008",
            "name" : "工业工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002009" : {
            "id" : "003002009",
            "name" : "材料工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002010" : {
            "id" : "003002010",
            "name" : "机械工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002011" : {
            "id" : "003002011",
            "name" : "结构工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002012" : {
            "id" : "003002012",
            "name" : "模具工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002013" : {
            "id" : "003002013",
            "name" : "机电工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002014" : {
            "id" : "003002014",
            "name" : "维修工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002015" : {
            "id" : "003002015",
            "name" : "装配工程师/技师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002016" : {
            "id" : "003002016",
            "name" : "铸造/锻造工程师/技师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002017" : {
            "id" : "003002017",
            "name" : "注塑工程师/技师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002018" : {
            "id" : "003002018",
            "name" : "焊接工程师/技师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002019" : {
            "id" : "003002019",
            "name" : "夹具工程师/技师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002020" : {
            "id" : "003002020",
            "name" : "CNC工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002021" : {
            "id" : "003002021",
            "name" : "冲压工程师/技师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002022" : {
            "id" : "003002022",
            "name" : "锅炉工程师/技师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002023" : {
            "id" : "003002023",
            "name" : "电力工程师/技术员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002024" : {
            "id" : "003002024",
            "name" : "光源与照明工程",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002025" : {
            "id" : "003002025",
            "name" : "光伏系统工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002026" : {
            "id" : "003002026",
            "name" : "汽车/摩托车工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002027" : {
            "id" : "003002027",
            "name" : "船舶工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002028" : {
            "id" : "003002028",
            "name" : "轨道交通工程师/技术员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002029" : {
            "id" : "003002029",
            "name" : "飞机维修机械师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002030" : {
            "id" : "003002030",
            "name" : "飞行器设计与制造",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002031" : {
            "id" : "003002031",
            "name" : "水利/水电工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002032" : {
            "id" : "003002032",
            "name" : "空调/热能工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002033" : {
            "id" : "003002033",
            "name" : "石油天然气技术人员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002034" : {
            "id" : "003002034",
            "name" : "矿产勘探/地质勘测工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          },
          "003002035" : {
            "id" : "003002035",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003002"
          }
        },
        "parent_id" : "003"
      },
      "003003" : {
        "id" : "003003",
        "name" : "电子/电器/半导体/仪器仪表",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "003003000" : {
            "id" : "003003000",
            "name" : "集成电路IC设计/应用工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003003"
          },
          "003003001" : {
            "id" : "003003001",
            "name" : "IC验证工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003003"
          },
          "003003002" : {
            "id" : "003003002",
            "name" : "电子工程师/技术员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003003"
          },
          "003003003" : {
            "id" : "003003003",
            "name" : "电子技术研发工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003003"
          },
          "003003004" : {
            "id" : "003003004",
            "name" : "射频工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003003"
          },
          "003003005" : {
            "id" : "003003005",
            "name" : "电子/电器维修工程师/技师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003003"
          },
          "003003006" : {
            "id" : "003003006",
            "name" : "变压器与磁电工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003003"
          },
          "003003007" : {
            "id" : "003003007",
            "name" : "版图设计工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003003"
          },
          "003003008" : {
            "id" : "003003008",
            "name" : "电气工程师/技术员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003003"
          },
          "003003009" : {
            "id" : "003003009",
            "name" : "电路工程师/技术员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003003"
          },
          "003003010" : {
            "id" : "003003010",
            "name" : "电声/音响工程师/技术员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003003"
          },
          "003003011" : {
            "id" : "003003011",
            "name" : "激光/光电子技术",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003003"
          },
          "003003012" : {
            "id" : "003003012",
            "name" : "半导体技术",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003003"
          },
          "003003013" : {
            "id" : "003003013",
            "name" : "自动控制工程师/技术员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003003"
          },
          "003003014" : {
            "id" : "003003014",
            "name" : "电子软件开发",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003003"
          },
          "003003015" : {
            "id" : "003003015",
            "name" : "嵌入式软件开发",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003003"
          },
          "003003016" : {
            "id" : "003003016",
            "name" : "嵌入式硬件开发",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003003"
          },
          "003003017" : {
            "id" : "003003017",
            "name" : "电池/电源开发",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003003"
          },
          "003003018" : {
            "id" : "003003018",
            "name" : "FAE 现场应用工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003003"
          },
          "003003019" : {
            "id" : "003003019",
            "name" : "工艺工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003003"
          },
          "003003020" : {
            "id" : "003003020",
            "name" : "家用电器/数码产品研发",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003003"
          },
          "003003021" : {
            "id" : "003003021",
            "name" : "仪器/仪表/计量分析师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003003"
          },
          "003003022" : {
            "id" : "003003022",
            "name" : "测试工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003003"
          },
          "003003023" : {
            "id" : "003003023",
            "name" : "安防系统工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003003"
          },
          "003003024" : {
            "id" : "003003024",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003003"
          }
        },
        "parent_id" : "003"
      },
      "003004" : {
        "id" : "003004",
        "name" : "汽车制造",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "003004000" : {
            "id" : "003004000",
            "name" : "汽车机构工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003004"
          },
          "003004001" : {
            "id" : "003004001",
            "name" : "汽车设计工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003004"
          },
          "003004002" : {
            "id" : "003004002",
            "name" : "汽车电子工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003004"
          },
          "003004003" : {
            "id" : "003004003",
            "name" : "发动机/总装工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003004"
          },
          "003004004" : {
            "id" : "003004004",
            "name" : "汽车项目管理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003004"
          },
          "003004005" : {
            "id" : "003004005",
            "name" : "汽车质量管理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003004"
          },
          "003004006" : {
            "id" : "003004006",
            "name" : "汽车安全性能工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003004"
          },
          "003004007" : {
            "id" : "003004007",
            "name" : "汽车装配工艺工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003004"
          },
          "003004008" : {
            "id" : "003004008",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003004"
          }
        },
        "parent_id" : "003"
      },
      "003005" : {
        "id" : "003005",
        "name" : "汽车销售与服务",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "003005000" : {
            "id" : "003005000",
            "name" : "汽车销售/经纪人",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003005"
          },
          "003005001" : {
            "id" : "003005001",
            "name" : "汽车修理工",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003005"
          },
          "003005002" : {
            "id" : "003005002",
            "name" : "汽车电工",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003005"
          },
          "003005003" : {
            "id" : "003005003",
            "name" : "汽车钣金",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003005"
          },
          "003005004" : {
            "id" : "003005004",
            "name" : "汽车喷漆",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003005"
          },
          "003005005" : {
            "id" : "003005005",
            "name" : "汽车检验/检测",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003005"
          },
          "003005006" : {
            "id" : "003005006",
            "name" : "汽车装饰美容",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003005"
          },
          "003005007" : {
            "id" : "003005007",
            "name" : "售后服务/客户服务",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003005"
          },
          "003005008" : {
            "id" : "003005008",
            "name" : "二手车评估师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003005"
          },
          "003005009" : {
            "id" : "003005009",
            "name" : "加油站工作员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003005"
          },
          "003005010" : {
            "id" : "003005010",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003005"
          }
        },
        "parent_id" : "003"
      },
      "003006" : {
        "id" : "003006",
        "name" : "服装/纺织/皮革",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "003006000" : {
            "id" : "003006000",
            "name" : "服装/纺织设计",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003006"
          },
          "003006001" : {
            "id" : "003006001",
            "name" : "服装/纺织/皮革工艺师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003006"
          },
          "003006002" : {
            "id" : "003006002",
            "name" : "面料辅料开发",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003006"
          },
          "003006003" : {
            "id" : "003006003",
            "name" : "面料辅料采购",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003006"
          },
          "003006004" : {
            "id" : "003006004",
            "name" : "服装/纺织/皮革跟单",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003006"
          },
          "003006005" : {
            "id" : "003006005",
            "name" : "服装领班",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003006"
          },
          "003006006" : {
            "id" : "003006006",
            "name" : "质量管理/验货员(QA/QC)",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003006"
          },
          "003006007" : {
            "id" : "003006007",
            "name" : "板房/楦头/底格出格师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003006"
          },
          "003006008" : {
            "id" : "003006008",
            "name" : "电脑放码员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003006"
          },
          "003006009" : {
            "id" : "003006009",
            "name" : "技工",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003006"
          },
          "003006010" : {
            "id" : "003006010",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003006"
          }
        },
        "parent_id" : "003"
      },
      "003007" : {
        "id" : "003007",
        "name" : "印刷包装",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "003007000" : {
            "id" : "003007000",
            "name" : "校对/录入",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003007"
          },
          "003007001" : {
            "id" : "003007001",
            "name" : "晒版员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003007"
          },
          "003007002" : {
            "id" : "003007002",
            "name" : "印刷排版/制版",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003007"
          },
          "003007003" : {
            "id" : "003007003",
            "name" : "数码直印/菲林输出",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003007"
          },
          "003007004" : {
            "id" : "003007004",
            "name" : "调墨技师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003007"
          },
          "003007005" : {
            "id" : "003007005",
            "name" : "电分操作员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003007"
          },
          "003007006" : {
            "id" : "003007006",
            "name" : "技工",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003007"
          },
          "003007007" : {
            "id" : "003007007",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003007"
          }
        },
        "parent_id" : "003"
      },
      "003008" : {
        "id" : "003008",
        "name" : "生物/制药/医疗器械",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "003008000" : {
            "id" : "003008000",
            "name" : "生物工程/生物制药",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003008"
          },
          "003008001" : {
            "id" : "003008001",
            "name" : "化学分析测试员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003008"
          },
          "003008002" : {
            "id" : "003008002",
            "name" : "医药技术研发人员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003008"
          },
          "003008003" : {
            "id" : "003008003",
            "name" : "医药学术推广",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003008"
          },
          "003008004" : {
            "id" : "003008004",
            "name" : "临床研究员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003008"
          },
          "003008005" : {
            "id" : "003008005",
            "name" : "临床协调员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003008"
          },
          "003008006" : {
            "id" : "003008006",
            "name" : "临床数据分析员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003008"
          },
          "003008007" : {
            "id" : "003008007",
            "name" : "药品注册",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003008"
          },
          "003008008" : {
            "id" : "003008008",
            "name" : "药品生产/质量管理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003008"
          },
          "003008009" : {
            "id" : "003008009",
            "name" : "药品市场推广",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003008"
          },
          "003008010" : {
            "id" : "003008010",
            "name" : "医药招商",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003008"
          },
          "003008011" : {
            "id" : "003008011",
            "name" : "政府事务管理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003008"
          },
          "003008012" : {
            "id" : "003008012",
            "name" : "招投标管理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003008"
          },
          "003008013" : {
            "id" : "003008013",
            "name" : "医药销售代表",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003008"
          },
          "003008014" : {
            "id" : "003008014",
            "name" : "医疗器械注册",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003008"
          },
          "003008015" : {
            "id" : "003008015",
            "name" : "医疗器械研发",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003008"
          },
          "003008016" : {
            "id" : "003008016",
            "name" : "医疗器械生产/质量管理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003008"
          },
          "003008017" : {
            "id" : "003008017",
            "name" : "医疗器械市场推广",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003008"
          },
          "003008018" : {
            "id" : "003008018",
            "name" : "医疗器械销售代表",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003008"
          },
          "003008019" : {
            "id" : "003008019",
            "name" : "医疗器械维修人员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003008"
          },
          "003008020" : {
            "id" : "003008020",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003008"
          }
        },
        "parent_id" : "003"
      },
      "003009" : {
        "id" : "003009",
        "name" : "化工",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "003009000" : {
            "id" : "003009000",
            "name" : "化工技术应用/化工工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003009"
          },
          "003009001" : {
            "id" : "003009001",
            "name" : "化工实验室研究员/技术员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003009"
          },
          "003009002" : {
            "id" : "003009002",
            "name" : "涂料研发工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003009"
          },
          "003009003" : {
            "id" : "003009003",
            "name" : "配色技术员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003009"
          },
          "003009004" : {
            "id" : "003009004",
            "name" : "塑料工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003009"
          },
          "003009005" : {
            "id" : "003009005",
            "name" : "化妆品研发",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003009"
          },
          "003009006" : {
            "id" : "003009006",
            "name" : "食品/饮料研发",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003009"
          },
          "003009007" : {
            "id" : "003009007",
            "name" : "造纸研发",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003009"
          },
          "003009008" : {
            "id" : "003009008",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003009"
          }
        },
        "parent_id" : "003"
      },
      "003010" : {
        "id" : "003010",
        "name" : "技工普工",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "003010000" : {
            "id" : "003010000",
            "name" : "普工/操作工/技工",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003010"
          },
          "003010001" : {
            "id" : "003010001",
            "name" : "学徒工",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003010"
          },
          "003010002" : {
            "id" : "003010002",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "003010"
          }
        },
        "parent_id" : "003"
      }
    },
    "parent_id" : "0"
  },
  "004" : {
    "id" : "004",
    "name" : "采购贸易/交通物流",
    "level" : 1,
    "order" : 0,
    "leaf" : false,
    "children" : {
      "004000" : {
        "id" : "004000",
        "name" : "采购",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "004000000" : {
            "id" : "004000000",
            "name" : "采购员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004000"
          },
          "004000001" : {
            "id" : "004000001",
            "name" : "采购助理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004000"
          },
          "004000002" : {
            "id" : "004000002",
            "name" : "买手",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004000"
          },
          "004000003" : {
            "id" : "004000003",
            "name" : "供应商开发",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004000"
          },
          "004000004" : {
            "id" : "004000004",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004000"
          }
        },
        "parent_id" : "004"
      },
      "004001" : {
        "id" : "004001",
        "name" : "贸易",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "004001000" : {
            "id" : "004001000",
            "name" : "贸易/外贸专员/助理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004001"
          },
          "004001001" : {
            "id" : "004001001",
            "name" : "国内贸易人员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004001"
          },
          "004001002" : {
            "id" : "004001002",
            "name" : "业务跟单",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004001"
          },
          "004001003" : {
            "id" : "004001003",
            "name" : "助理业务跟单",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004001"
          },
          "004001004" : {
            "id" : "004001004",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004001"
          }
        },
        "parent_id" : "004"
      },
      "004002" : {
        "id" : "004002",
        "name" : "交通运输",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "004002000" : {
            "id" : "004002000",
            "name" : "空乘人员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004002"
          },
          "004002001" : {
            "id" : "004002001",
            "name" : "客运司机",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004002"
          },
          "004002002" : {
            "id" : "004002002",
            "name" : "货运司机",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004002"
          },
          "004002003" : {
            "id" : "004002003",
            "name" : "列车/地铁司机",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004002"
          },
          "004002004" : {
            "id" : "004002004",
            "name" : "特种车司机",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004002"
          },
          "004002005" : {
            "id" : "004002005",
            "name" : "地勤人员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004002"
          },
          "004002006" : {
            "id" : "004002006",
            "name" : "乘务员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004002"
          },
          "004002007" : {
            "id" : "004002007",
            "name" : "船员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004002"
          },
          "004002008" : {
            "id" : "004002008",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004002"
          }
        },
        "parent_id" : "004"
      },
      "004003" : {
        "id" : "004003",
        "name" : "物流/仓储",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "004003000" : {
            "id" : "004003000",
            "name" : "物流专员/助理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004003"
          },
          "004003001" : {
            "id" : "004003001",
            "name" : "供应链专员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004003"
          },
          "004003002" : {
            "id" : "004003002",
            "name" : "物料专员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004003"
          },
          "004003003" : {
            "id" : "004003003",
            "name" : "仓库管理员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004003"
          },
          "004003004" : {
            "id" : "004003004",
            "name" : "订单处理员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004003"
          },
          "004003005" : {
            "id" : "004003005",
            "name" : "货运代理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004003"
          },
          "004003006" : {
            "id" : "004003006",
            "name" : "集装箱业务",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004003"
          },
          "004003007" : {
            "id" : "004003007",
            "name" : "海关事务管理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004003"
          },
          "004003008" : {
            "id" : "004003008",
            "name" : "报关与报检",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004003"
          },
          "004003009" : {
            "id" : "004003009",
            "name" : "单证员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004003"
          },
          "004003010" : {
            "id" : "004003010",
            "name" : "船务/空运陆运操作",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004003"
          },
          "004003011" : {
            "id" : "004003011",
            "name" : "快递员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004003"
          },
          "004003012" : {
            "id" : "004003012",
            "name" : "调度员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004003"
          },
          "004003013" : {
            "id" : "004003013",
            "name" : "安检员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004003"
          },
          "004003014" : {
            "id" : "004003014",
            "name" : "理货员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004003"
          },
          "004003015" : {
            "id" : "004003015",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "004003"
          }
        },
        "parent_id" : "004"
      }
    },
    "parent_id" : "0"
  },
  "005" : {
    "id" : "005",
    "name" : "媒体/出版/设计",
    "level" : 1,
    "order" : 0,
    "leaf" : false,
    "children" : {
      "005000" : {
        "id" : "005000",
        "name" : "影视/媒体",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "005000000" : {
            "id" : "005000000",
            "name" : "影视策划/制作人员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "005000"
          },
          "005000001" : {
            "id" : "005000001",
            "name" : "导演/编导",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "005000"
          },
          "005000002" : {
            "id" : "005000002",
            "name" : "艺术指导/舞台美术设计",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "005000"
          },
          "005000003" : {
            "id" : "005000003",
            "name" : "经纪人/星探",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "005000"
          },
          "005000004" : {
            "id" : "005000004",
            "name" : "摄影师/摄像师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "005000"
          },
          "005000005" : {
            "id" : "005000005",
            "name" : "后期制作",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "005000"
          },
          "005000006" : {
            "id" : "005000006",
            "name" : "音效师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "005000"
          },
          "005000007" : {
            "id" : "005000007",
            "name" : "配音员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "005000"
          },
          "005000008" : {
            "id" : "005000008",
            "name" : "灯光师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "005000"
          },
          "005000009" : {
            "id" : "005000009",
            "name" : "放映员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "005000"
          },
          "005000010" : {
            "id" : "005000010",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "005000"
          }
        },
        "parent_id" : "005"
      },
      "005001" : {
        "id" : "005001",
        "name" : "编辑出版",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "005001000" : {
            "id" : "005001000",
            "name" : "编辑",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "005001"
          },
          "005001001" : {
            "id" : "005001001",
            "name" : "作家/撰稿人",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "005001"
          },
          "005001002" : {
            "id" : "005001002",
            "name" : "记者",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "005001"
          },
          "005001003" : {
            "id" : "005001003",
            "name" : "电话采编",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "005001"
          },
          "005001004" : {
            "id" : "005001004",
            "name" : "美术编辑",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "005001"
          },
          "005001005" : {
            "id" : "005001005",
            "name" : "排版设计",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "005001"
          },
          "005001006" : {
            "id" : "005001006",
            "name" : "出版/发行",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "005001"
          },
          "005001007" : {
            "id" : "005001007",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "005001"
          }
        },
        "parent_id" : "005"
      },
      "005002" : {
        "id" : "005002",
        "name" : "艺术/设计",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "005002000" : {
            "id" : "005002000",
            "name" : "平面设计师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "005002"
          },
          "005002001" : {
            "id" : "005002001",
            "name" : "绘画",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "005002"
          },
          "005002002" : {
            "id" : "005002002",
            "name" : "动画/3D设计",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "005002"
          },
          "005002003" : {
            "id" : "005002003",
            "name" : "原画师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "005002"
          },
          "005002004" : {
            "id" : "005002004",
            "name" : "展览/展示/店面设计",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "005002"
          },
          "005002005" : {
            "id" : "005002005",
            "name" : "多媒体设计",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "005002"
          },
          "005002006" : {
            "id" : "005002006",
            "name" : "包装设计",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "005002"
          },
          "005002007" : {
            "id" : "005002007",
            "name" : "工业/产品设计",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "005002"
          },
          "005002008" : {
            "id" : "005002008",
            "name" : "工艺品/珠宝设计鉴定",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "005002"
          },
          "005002009" : {
            "id" : "005002009",
            "name" : "家具/家居用品设计",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "005002"
          },
          "005002010" : {
            "id" : "005002010",
            "name" : "玩具设计",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "005002"
          },
          "005002011" : {
            "id" : "005002011",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "005002"
          }
        },
        "parent_id" : "005"
      }
    },
    "parent_id" : "0"
  },
  "006" : {
    "id" : "006",
    "name" : "建筑/房地产",
    "level" : 1,
    "order" : 0,
    "leaf" : false,
    "children" : {
      "006000" : {
        "id" : "006000",
        "name" : "建筑工程与装潢",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "006000000" : {
            "id" : "006000000",
            "name" : "建筑工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006000"
          },
          "006000001" : {
            "id" : "006000001",
            "name" : "建筑设计师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006000"
          },
          "006000002" : {
            "id" : "006000002",
            "name" : "市政工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006000"
          },
          "006000003" : {
            "id" : "006000003",
            "name" : "结构/土木/土建工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006000"
          },
          "006000004" : {
            "id" : "006000004",
            "name" : "公路/桥梁/港口/隧道工程",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006000"
          },
          "006000005" : {
            "id" : "006000005",
            "name" : "岩土工程",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006000"
          },
          "006000006" : {
            "id" : "006000006",
            "name" : "楼宇自动化",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006000"
          },
          "006000007" : {
            "id" : "006000007",
            "name" : "建筑机电工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006000"
          },
          "006000008" : {
            "id" : "006000008",
            "name" : "智能大厦/综合布线/安防/弱电",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006000"
          },
          "006000009" : {
            "id" : "006000009",
            "name" : "给排水/暖通工程",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006000"
          },
          "006000010" : {
            "id" : "006000010",
            "name" : "幕墙工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006000"
          },
          "006000011" : {
            "id" : "006000011",
            "name" : "规划与设计",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006000"
          },
          "006000012" : {
            "id" : "006000012",
            "name" : "室内设计",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006000"
          },
          "006000013" : {
            "id" : "006000013",
            "name" : "园艺/园林/景观设计",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006000"
          },
          "006000014" : {
            "id" : "006000014",
            "name" : "测绘/测量",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006000"
          },
          "006000015" : {
            "id" : "006000015",
            "name" : "建筑制图/模型/渲染",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006000"
          },
          "006000016" : {
            "id" : "006000016",
            "name" : "开发报建",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006000"
          },
          "006000017" : {
            "id" : "006000017",
            "name" : "工程造价师/预结算经理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006000"
          },
          "006000018" : {
            "id" : "006000018",
            "name" : "预结算员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006000"
          },
          "006000019" : {
            "id" : "006000019",
            "name" : "建筑工程管理/项目经理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006000"
          },
          "006000020" : {
            "id" : "006000020",
            "name" : "建筑项目助理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006000"
          },
          "006000021" : {
            "id" : "006000021",
            "name" : "建筑工程验收",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006000"
          },
          "006000022" : {
            "id" : "006000022",
            "name" : "工程监理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006000"
          },
          "006000023" : {
            "id" : "006000023",
            "name" : "合同管理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006000"
          },
          "006000024" : {
            "id" : "006000024",
            "name" : "安全员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006000"
          },
          "006000025" : {
            "id" : "006000025",
            "name" : "资料员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006000"
          },
          "006000026" : {
            "id" : "006000026",
            "name" : "建筑安装施工员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006000"
          },
          "006000027" : {
            "id" : "006000027",
            "name" : "技术工人",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006000"
          },
          "006000028" : {
            "id" : "006000028",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006000"
          }
        },
        "parent_id" : "006"
      },
      "006001" : {
        "id" : "006001",
        "name" : "房地产开发",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "006001000" : {
            "id" : "006001000",
            "name" : "房地产项目/开发/策划",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006001"
          },
          "006001001" : {
            "id" : "006001001",
            "name" : "房产项目配套工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006001"
          },
          "006001002" : {
            "id" : "006001002",
            "name" : "房地产项目招投标",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006001"
          },
          "006001003" : {
            "id" : "006001003",
            "name" : "房地产投资分析",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006001"
          },
          "006001004" : {
            "id" : "006001004",
            "name" : "房地产资产管理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006001"
          },
          "006001005" : {
            "id" : "006001005",
            "name" : "监察人员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006001"
          },
          "006001006" : {
            "id" : "006001006",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006001"
          }
        },
        "parent_id" : "006"
      },
      "006002" : {
        "id" : "006002",
        "name" : "房地产销售与中介",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "006002000" : {
            "id" : "006002000",
            "name" : "房地产销售",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006002"
          },
          "006002001" : {
            "id" : "006002001",
            "name" : "房地产中介/置业顾问",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006002"
          },
          "006002002" : {
            "id" : "006002002",
            "name" : "房地产评估",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006002"
          },
          "006002003" : {
            "id" : "006002003",
            "name" : "房地产内勤",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006002"
          },
          "006002004" : {
            "id" : "006002004",
            "name" : "房地产客服",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006002"
          },
          "006002005" : {
            "id" : "006002005",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "006002"
          }
        },
        "parent_id" : "006"
      }
    },
    "parent_id" : "0"
  },
  "007" : {
    "id" : "007",
    "name" : "财务/人力/行政",
    "level" : 1,
    "order" : 0,
    "leaf" : false,
    "children" : {
      "007000" : {
        "id" : "007000",
        "name" : "财务/审计/税务",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "007000000" : {
            "id" : "007000000",
            "name" : "财务顾问",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "007000"
          },
          "007000001" : {
            "id" : "007000001",
            "name" : "会计出纳员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "007000"
          },
          "007000002" : {
            "id" : "007000002",
            "name" : "财务助理/文员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "007000"
          },
          "007000003" : {
            "id" : "007000003",
            "name" : "固定资产会计",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "007000"
          },
          "007000004" : {
            "id" : "007000004",
            "name" : "财务分析员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "007000"
          },
          "007000005" : {
            "id" : "007000005",
            "name" : "成本管理员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "007000"
          },
          "007000006" : {
            "id" : "007000006",
            "name" : "资金专员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "007000"
          },
          "007000007" : {
            "id" : "007000007",
            "name" : "审计专员/助理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "007000"
          },
          "007000008" : {
            "id" : "007000008",
            "name" : "税务专员/助理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "007000"
          },
          "007000009" : {
            "id" : "007000009",
            "name" : "统计员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "007000"
          },
          "007000010" : {
            "id" : "007000010",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "007000"
          }
        },
        "parent_id" : "007"
      },
      "007001" : {
        "id" : "007001",
        "name" : "人力资源",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "007001000" : {
            "id" : "007001000",
            "name" : "人事专员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "007001"
          },
          "007001001" : {
            "id" : "007001001",
            "name" : "人事助理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "007001"
          },
          "007001002" : {
            "id" : "007001002",
            "name" : "招聘专员/助理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "007001"
          },
          "007001003" : {
            "id" : "007001003",
            "name" : "薪资福利专员/助理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "007001"
          },
          "007001004" : {
            "id" : "007001004",
            "name" : "绩效考核专员/助理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "007001"
          },
          "007001005" : {
            "id" : "007001005",
            "name" : "培训专员/助理/培训师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "007001"
          },
          "007001006" : {
            "id" : "007001006",
            "name" : "企业文化/员工关系",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "007001"
          },
          "007001007" : {
            "id" : "007001007",
            "name" : "人力资源信息系统专员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "007001"
          },
          "007001008" : {
            "id" : "007001008",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "007001"
          }
        },
        "parent_id" : "007"
      },
      "007002" : {
        "id" : "007002",
        "name" : "行政/后勤",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "007002000" : {
            "id" : "007002000",
            "name" : "行政专员/助理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "007002"
          },
          "007002001" : {
            "id" : "007002001",
            "name" : "前台接待/总机/接待生",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "007002"
          },
          "007002002" : {
            "id" : "007002002",
            "name" : "图书管理员/资料管理员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "007002"
          },
          "007002003" : {
            "id" : "007002003",
            "name" : "电脑操作员/打字员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "007002"
          },
          "007002004" : {
            "id" : "007002004",
            "name" : "后勤",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "007002"
          },
          "007002005" : {
            "id" : "007002005",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "007002"
          }
        },
        "parent_id" : "007"
      }
    },
    "parent_id" : "0"
  },
  "008" : {
    "id" : "008",
    "name" : "咨询/法律/教育/翻译",
    "level" : 1,
    "order" : 0,
    "leaf" : false,
    "children" : {
      "008000" : {
        "id" : "008000",
        "name" : "咨询/顾问",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "008000000" : {
            "id" : "008000000",
            "name" : "专业顾问",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008000"
          },
          "008000001" : {
            "id" : "008000001",
            "name" : "专业培训师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008000"
          },
          "008000002" : {
            "id" : "008000002",
            "name" : "咨询员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008000"
          },
          "008000003" : {
            "id" : "008000003",
            "name" : "调研员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008000"
          },
          "008000004" : {
            "id" : "008000004",
            "name" : "猎头/人才中介",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008000"
          },
          "008000005" : {
            "id" : "008000005",
            "name" : "情报信息分析人员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008000"
          },
          "008000006" : {
            "id" : "008000006",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008000"
          }
        },
        "parent_id" : "008"
      },
      "008001" : {
        "id" : "008001",
        "name" : "律师/法务/合规",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "008001000" : {
            "id" : "008001000",
            "name" : "律师/法律顾问",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008001"
          },
          "008001001" : {
            "id" : "008001001",
            "name" : "律师助理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008001"
          },
          "008001002" : {
            "id" : "008001002",
            "name" : "法务主管/专员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008001"
          },
          "008001003" : {
            "id" : "008001003",
            "name" : "法务助理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008001"
          },
          "008001004" : {
            "id" : "008001004",
            "name" : "合规主管/专员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008001"
          },
          "008001005" : {
            "id" : "008001005",
            "name" : "知识产权/专利/商标",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008001"
          },
          "008001006" : {
            "id" : "008001006",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008001"
          }
        },
        "parent_id" : "008"
      },
      "008002" : {
        "id" : "008002",
        "name" : "教师",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "008002000" : {
            "id" : "008002000",
            "name" : "讲师/助教",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008002"
          },
          "008002001" : {
            "id" : "008002001",
            "name" : "中学教师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008002"
          },
          "008002002" : {
            "id" : "008002002",
            "name" : "小学教师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008002"
          },
          "008002003" : {
            "id" : "008002003",
            "name" : "幼教",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008002"
          },
          "008002004" : {
            "id" : "008002004",
            "name" : "外语培训师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008002"
          },
          "008002005" : {
            "id" : "008002005",
            "name" : "院校教务管理人员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008002"
          },
          "008002006" : {
            "id" : "008002006",
            "name" : "兼职教师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008002"
          },
          "008002007" : {
            "id" : "008002007",
            "name" : "家教",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008002"
          },
          "008002008" : {
            "id" : "008002008",
            "name" : "音乐/美术教师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008002"
          },
          "008002009" : {
            "id" : "008002009",
            "name" : "体育教师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008002"
          },
          "008002010" : {
            "id" : "008002010",
            "name" : "职业技术教师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008002"
          },
          "008002011" : {
            "id" : "008002011",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008002"
          }
        },
        "parent_id" : "008"
      },
      "008003" : {
        "id" : "008003",
        "name" : "培训",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "008003000" : {
            "id" : "008003000",
            "name" : "培训督导",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008003"
          },
          "008003001" : {
            "id" : "008003001",
            "name" : "培训讲师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008003"
          },
          "008003002" : {
            "id" : "008003002",
            "name" : "培训策划",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008003"
          },
          "008003003" : {
            "id" : "008003003",
            "name" : "培训产品开发",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008003"
          },
          "008003004" : {
            "id" : "008003004",
            "name" : "培训/课程顾问",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008003"
          },
          "008003005" : {
            "id" : "008003005",
            "name" : "培训助理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008003"
          },
          "008003006" : {
            "id" : "008003006",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008003"
          }
        },
        "parent_id" : "008"
      },
      "008004" : {
        "id" : "008004",
        "name" : "翻译",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "008004000" : {
            "id" : "008004000",
            "name" : "英语翻译",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008004"
          },
          "008004001" : {
            "id" : "008004001",
            "name" : "日语翻译",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008004"
          },
          "008004002" : {
            "id" : "008004002",
            "name" : "德语翻译",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008004"
          },
          "008004003" : {
            "id" : "008004003",
            "name" : "法语翻译",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008004"
          },
          "008004004" : {
            "id" : "008004004",
            "name" : "俄语翻译",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008004"
          },
          "008004005" : {
            "id" : "008004005",
            "name" : "其他语种翻译",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "008004"
          }
        },
        "parent_id" : "008"
      }
    },
    "parent_id" : "0"
  },
  "009" : {
    "id" : "009",
    "name" : "服务业",
    "level" : 1,
    "order" : 0,
    "leaf" : false,
    "children" : {
      "009000" : {
        "id" : "009000",
        "name" : "餐饮服务",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "009000000" : {
            "id" : "009000000",
            "name" : "餐厅领班",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009000"
          },
          "009000001" : {
            "id" : "009000001",
            "name" : "餐饮服务员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009000"
          },
          "009000002" : {
            "id" : "009000002",
            "name" : "厨师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009000"
          },
          "009000003" : {
            "id" : "009000003",
            "name" : "面点师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009000"
          },
          "009000004" : {
            "id" : "009000004",
            "name" : "西点师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009000"
          },
          "009000005" : {
            "id" : "009000005",
            "name" : "厨师助理/学徒",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009000"
          },
          "009000006" : {
            "id" : "009000006",
            "name" : "茶艺师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009000"
          },
          "009000007" : {
            "id" : "009000007",
            "name" : "咖啡师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009000"
          },
          "009000008" : {
            "id" : "009000008",
            "name" : "调酒师/侍酒师/吧台员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009000"
          },
          "009000009" : {
            "id" : "009000009",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009000"
          }
        },
        "parent_id" : "009"
      },
      "009001" : {
        "id" : "009001",
        "name" : "酒店旅游",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "009001000" : {
            "id" : "009001000",
            "name" : "酒店/宾馆销售",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009001"
          },
          "009001001" : {
            "id" : "009001001",
            "name" : "预定员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009001"
          },
          "009001002" : {
            "id" : "009001002",
            "name" : "大堂经理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009001"
          },
          "009001003" : {
            "id" : "009001003",
            "name" : "酒店前台",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009001"
          },
          "009001004" : {
            "id" : "009001004",
            "name" : "宴会管理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009001"
          },
          "009001005" : {
            "id" : "009001005",
            "name" : "宾客服务经理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009001"
          },
          "009001006" : {
            "id" : "009001006",
            "name" : "楼面经理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009001"
          },
          "009001007" : {
            "id" : "009001007",
            "name" : "客房服务员/楼面服务员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009001"
          },
          "009001008" : {
            "id" : "009001008",
            "name" : "健身房服务",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009001"
          },
          "009001009" : {
            "id" : "009001009",
            "name" : "行李员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009001"
          },
          "009001010" : {
            "id" : "009001010",
            "name" : "管家部经理/主管",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009001"
          },
          "009001011" : {
            "id" : "009001011",
            "name" : "清洁服务人员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009001"
          },
          "009001012" : {
            "id" : "009001012",
            "name" : "旅游产品销售",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009001"
          },
          "009001013" : {
            "id" : "009001013",
            "name" : "行程管理/计调",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009001"
          },
          "009001014" : {
            "id" : "009001014",
            "name" : "签证专员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009001"
          },
          "009001015" : {
            "id" : "009001015",
            "name" : "导游/旅行顾问",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009001"
          },
          "009001016" : {
            "id" : "009001016",
            "name" : "票务",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009001"
          },
          "009001017" : {
            "id" : "009001017",
            "name" : "机场代表",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009001"
          },
          "009001018" : {
            "id" : "009001018",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009001"
          }
        },
        "parent_id" : "009"
      },
      "009002" : {
        "id" : "009002",
        "name" : "美容保健",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "009002000" : {
            "id" : "009002000",
            "name" : "美容培训师/导师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009002"
          },
          "009002001" : {
            "id" : "009002001",
            "name" : "美容顾问",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009002"
          },
          "009002002" : {
            "id" : "009002002",
            "name" : "美容师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009002"
          },
          "009002003" : {
            "id" : "009002003",
            "name" : "美容助理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009002"
          },
          "009002004" : {
            "id" : "009002004",
            "name" : "彩妆培训师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009002"
          },
          "009002005" : {
            "id" : "009002005",
            "name" : "专柜彩妆顾问(BA)",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009002"
          },
          "009002006" : {
            "id" : "009002006",
            "name" : "化妆师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009002"
          },
          "009002007" : {
            "id" : "009002007",
            "name" : "造型师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009002"
          },
          "009002008" : {
            "id" : "009002008",
            "name" : "美发店长",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009002"
          },
          "009002009" : {
            "id" : "009002009",
            "name" : "发型师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009002"
          },
          "009002010" : {
            "id" : "009002010",
            "name" : "发型助理/学徒",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009002"
          },
          "009002011" : {
            "id" : "009002011",
            "name" : "美甲师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009002"
          },
          "009002012" : {
            "id" : "009002012",
            "name" : "美体师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009002"
          },
          "009002013" : {
            "id" : "009002013",
            "name" : "瘦身顾问",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009002"
          },
          "009002014" : {
            "id" : "009002014",
            "name" : "SPA 技师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009002"
          },
          "009002015" : {
            "id" : "009002015",
            "name" : "按摩",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009002"
          },
          "009002016" : {
            "id" : "009002016",
            "name" : "足疗",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009002"
          },
          "009002017" : {
            "id" : "009002017",
            "name" : "宠物护理/美容",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009002"
          },
          "009002018" : {
            "id" : "009002018",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009002"
          }
        },
        "parent_id" : "009"
      },
      "009003" : {
        "id" : "009003",
        "name" : "运动健身",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "009003000" : {
            "id" : "009003000",
            "name" : "健身顾问/教练",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009003"
          },
          "009003001" : {
            "id" : "009003001",
            "name" : "瑜伽老师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009003"
          },
          "009003002" : {
            "id" : "009003002",
            "name" : "舞蹈老师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009003"
          },
          "009003003" : {
            "id" : "009003003",
            "name" : "游泳教练",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009003"
          },
          "009003004" : {
            "id" : "009003004",
            "name" : "救生员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009003"
          },
          "009003005" : {
            "id" : "009003005",
            "name" : "高尔夫教练",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009003"
          },
          "009003006" : {
            "id" : "009003006",
            "name" : "体育运动教练",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009003"
          },
          "009003007" : {
            "id" : "009003007",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009003"
          }
        },
        "parent_id" : "009"
      },
      "009004" : {
        "id" : "009004",
        "name" : "医院/医疗/护理",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "009004000" : {
            "id" : "009004000",
            "name" : "医院管理人员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009004"
          },
          "009004001" : {
            "id" : "009004001",
            "name" : "综合门诊/全科医生",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009004"
          },
          "009004002" : {
            "id" : "009004002",
            "name" : "内科医生",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009004"
          },
          "009004003" : {
            "id" : "009004003",
            "name" : "外科医生",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009004"
          },
          "009004004" : {
            "id" : "009004004",
            "name" : "专科医生",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009004"
          },
          "009004005" : {
            "id" : "009004005",
            "name" : "牙科医生",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009004"
          },
          "009004006" : {
            "id" : "009004006",
            "name" : "美容整形师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009004"
          },
          "009004007" : {
            "id" : "009004007",
            "name" : "麻醉医生",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009004"
          },
          "009004008" : {
            "id" : "009004008",
            "name" : "放射科医师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009004"
          },
          "009004009" : {
            "id" : "009004009",
            "name" : "理疗师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009004"
          },
          "009004010" : {
            "id" : "009004010",
            "name" : "中医科医生",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009004"
          },
          "009004011" : {
            "id" : "009004011",
            "name" : "针灸、推拿",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009004"
          },
          "009004012" : {
            "id" : "009004012",
            "name" : "儿科医生",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009004"
          },
          "009004013" : {
            "id" : "009004013",
            "name" : "心理医生",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009004"
          },
          "009004014" : {
            "id" : "009004014",
            "name" : "营养师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009004"
          },
          "009004015" : {
            "id" : "009004015",
            "name" : "药剂师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009004"
          },
          "009004016" : {
            "id" : "009004016",
            "name" : "医药学检验",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009004"
          },
          "009004017" : {
            "id" : "009004017",
            "name" : "公共卫生/疾病控制",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009004"
          },
          "009004018" : {
            "id" : "009004018",
            "name" : "护士/护理人员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009004"
          },
          "009004019" : {
            "id" : "009004019",
            "name" : "兽医",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009004"
          },
          "009004020" : {
            "id" : "009004020",
            "name" : "验光师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009004"
          },
          "009004021" : {
            "id" : "009004021",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009004"
          }
        },
        "parent_id" : "009"
      },
      "009005" : {
        "id" : "009005",
        "name" : "休闲娱乐",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "009005000" : {
            "id" : "009005000",
            "name" : "婚礼/庆典策划服务",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009005"
          },
          "009005001" : {
            "id" : "009005001",
            "name" : "DJ",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009005"
          },
          "009005002" : {
            "id" : "009005002",
            "name" : "驻唱/歌手",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009005"
          },
          "009005003" : {
            "id" : "009005003",
            "name" : "舞蹈演员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009005"
          },
          "009005004" : {
            "id" : "009005004",
            "name" : "模特演员/群众演员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009005"
          },
          "009005005" : {
            "id" : "009005005",
            "name" : "娱乐领班",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009005"
          },
          "009005006" : {
            "id" : "009005006",
            "name" : "娱乐服务员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009005"
          },
          "009005007" : {
            "id" : "009005007",
            "name" : "前台迎宾",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009005"
          },
          "009005008" : {
            "id" : "009005008",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009005"
          }
        },
        "parent_id" : "009"
      },
      "009006" : {
        "id" : "009006",
        "name" : "百货零售",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "009006000" : {
            "id" : "009006000",
            "name" : "品类经理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009006"
          },
          "009006001" : {
            "id" : "009006001",
            "name" : "品牌/连锁招商管理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009006"
          },
          "009006002" : {
            "id" : "009006002",
            "name" : "奢侈品业务",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009006"
          },
          "009006003" : {
            "id" : "009006003",
            "name" : "店员/营业员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009006"
          },
          "009006004" : {
            "id" : "009006004",
            "name" : "珠宝销售顾问",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009006"
          },
          "009006005" : {
            "id" : "009006005",
            "name" : "督导/巡店",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009006"
          },
          "009006006" : {
            "id" : "009006006",
            "name" : "导购员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009006"
          },
          "009006007" : {
            "id" : "009006007",
            "name" : "促销员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009006"
          },
          "009006008" : {
            "id" : "009006008",
            "name" : "收银员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009006"
          },
          "009006009" : {
            "id" : "009006009",
            "name" : "陈列员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009006"
          },
          "009006010" : {
            "id" : "009006010",
            "name" : "收货员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009006"
          },
          "009006011" : {
            "id" : "009006011",
            "name" : "理货员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009006"
          },
          "009006012" : {
            "id" : "009006012",
            "name" : "安防主管",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009006"
          },
          "009006013" : {
            "id" : "009006013",
            "name" : "防损员/内保",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009006"
          },
          "009006014" : {
            "id" : "009006014",
            "name" : "西点师/面包糕点加工",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009006"
          },
          "009006015" : {
            "id" : "009006015",
            "name" : "生鲜食品加工/处理",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009006"
          },
          "009006016" : {
            "id" : "009006016",
            "name" : "熟食加工",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009006"
          },
          "009006017" : {
            "id" : "009006017",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009006"
          }
        },
        "parent_id" : "009"
      },
      "009007" : {
        "id" : "009007",
        "name" : "家政保洁",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "009007000" : {
            "id" : "009007000",
            "name" : "家政服务/保姆",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009007"
          },
          "009007001" : {
            "id" : "009007001",
            "name" : "月嫂",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009007"
          },
          "009007002" : {
            "id" : "009007002",
            "name" : "育婴师/保育员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009007"
          },
          "009007003" : {
            "id" : "009007003",
            "name" : "护工",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009007"
          },
          "009007004" : {
            "id" : "009007004",
            "name" : "保镖",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009007"
          },
          "009007005" : {
            "id" : "009007005",
            "name" : "空调维修",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009007"
          },
          "009007006" : {
            "id" : "009007006",
            "name" : "家电维修",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009007"
          },
          "009007007" : {
            "id" : "009007007",
            "name" : "寻呼员/话务员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009007"
          },
          "009007008" : {
            "id" : "009007008",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "009007"
          }
        },
        "parent_id" : "009"
      }
    },
    "parent_id" : "0"
  },
  "010" : {
    "id" : "010",
    "name" : "环保/农业/科研/其他",
    "level" : 1,
    "order" : 0,
    "leaf" : false,
    "children" : {
      "010000" : {
        "id" : "010000",
        "name" : "环保",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "010000000" : {
            "id" : "010000000",
            "name" : "环保工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "010000"
          },
          "010000001" : {
            "id" : "010000001",
            "name" : "环境影响评价工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "010000"
          },
          "010000002" : {
            "id" : "010000002",
            "name" : "生态治理/规划",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "010000"
          },
          "010000003" : {
            "id" : "010000003",
            "name" : "环保检测",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "010000"
          },
          "010000004" : {
            "id" : "010000004",
            "name" : "水质检测员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "010000"
          },
          "010000005" : {
            "id" : "010000005",
            "name" : "水处理工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "010000"
          },
          "010000006" : {
            "id" : "010000006",
            "name" : "固废工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "010000"
          },
          "010000007" : {
            "id" : "010000007",
            "name" : "废气处理工程师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "010000"
          },
          "010000008" : {
            "id" : "010000008",
            "name" : "其它",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "010000"
          }
        },
        "parent_id" : "010"
      },
      "010001" : {
        "id" : "010001",
        "name" : "农/林/牧/渔",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "010001000" : {
            "id" : "010001000",
            "name" : "农艺师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "010001"
          },
          "010001001" : {
            "id" : "010001001",
            "name" : "畜牧师",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "010001"
          },
          "010001002" : {
            "id" : "010001002",
            "name" : "饲养员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "010001"
          },
          "010001003" : {
            "id" : "010001003",
            "name" : "动物营养/饲料研发",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "010001"
          },
          "010001004" : {
            "id" : "010001004",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "010001"
          }
        },
        "parent_id" : "010"
      },
      "010002" : {
        "id" : "010002",
        "name" : "科研",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "010002000" : {
            "id" : "010002000",
            "name" : "科研管理人员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "010002"
          },
          "010002001" : {
            "id" : "010002001",
            "name" : "科研人员",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "010002"
          }
        },
        "parent_id" : "010"
      },
      "010003" : {
        "id" : "010003",
        "name" : "储备干部/培训生",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "010003000" : {
            "id" : "010003000",
            "name" : "储备干部/培训生",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "010003"
          }
        },
        "parent_id" : "010"
      },
      "010004" : {
        "id" : "010004",
        "name" : "兼职",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "010004000" : {
            "id" : "010004000",
            "name" : "兼职",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "010004"
          }
        },
        "parent_id" : "010"
      },
      "010005" : {
        "id" : "010005",
        "name" : "实习",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "010005000" : {
            "id" : "010005000",
            "name" : "实习生",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "010005"
          }
        },
        "parent_id" : "010"
      },
      "010006" : {
        "id" : "010006",
        "name" : "其他",
        "level" : 2,
        "order" : 0,
        "leaf" : false,
        "children" : {
          "010006000" : {
            "id" : "010006000",
            "name" : "志愿者/社会工作者",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "010006"
          },
          "010006001" : {
            "id" : "010006001",
            "name" : "其他",
            "level" : 3,
            "order" : 0,
            "leaf" : true,
            "parent_id" : "010006"
          }
        },
        "parent_id" : "010"
      }
    },
    "parent_id" : "0"
  }
};
export const city = {
  "513200" : "阿坝",
  "370100" : "济南",
  "632800" : "海西州",
  "370900" : "泰安",
  "530100" : "昆明",
  "441500" : "汕尾",
  "421100" : "黄冈",
  "330200" : "宁波",
  "610100" : "西安",
  "340800" : "安庆",
  "420800" : "荆门",
  "231000" : "牡丹江",
  "640300" : "吴忠",
  "210300" : "鞍山",
  "411300" : "南阳",
  "510600" : "德阳",
  "451300" : "来宾",
  "621100" : "定西",
  "810000" : "香港",
  "371300" : "临沂",
  "430600" : "岳阳",
  "130200" : "唐山",
  "650100" : "乌鲁木齐",
  "220100" : "长春",
  "222400" : "延边",
  "520300" : "遵义",
  "522600" : "黔东南",
  "440400" : "珠海",
  "350500" : "泉州",
  "445300" : "云浮",
  "360300" : "萍乡",
  "530900" : "临沧",
  "150600" : "鄂尔多斯",
  "152900" : "阿拉善",
  "341200" : "阜阳",
  "620800" : "平凉",
  "211400" : "葫芦岛",
  "511800" : "雅安",
  "140800" : "运城",
  "410100" : "郑州",
  "320400" : "常州",
  "450200" : "柳州",
  "230700" : "宜春",
  "410900" : "濮阳",
  "370800" : "济宁",
  "632700" : "玉树",
  "441400" : "梅州",
  "421000" : "荆州",
  "330300" : "温州",
  "141100" : "吕梁",
  "610200" : "铜川",
  "420700" : "鄂州",
  "340100" : "合肥",
  "510500" : "泸州",
  "640200" : "石嘴山",
  "210200" : "大连",
  "411200" : "三门峡",
  "451200" : "河池",
  "371200" : "莱芜",
  "512000" : "资阳",
  "621200" : "陇南",
  "130100" : "石家庄",
  "220800" : "白城",
  "430500" : "邵阳",
  "640100" : "银川",
  "652300" : "昌吉",
  "130900" : "沧州",
  "520400" : "安顺",
  "522700" : "黔南",
  "440300" : "深圳",
  "445200" : "揭阳",
  "350400" : "三明",
  "230600" : "大庆",
  "360200" : "景德镇",
  "532500" : "红河",
  "150500" : "通辽",
  "450900" : "玉林",
  "511700" : "达州",
  "341300" : "宿州",
  "620900" : "酒泉",
  "140700" : "晋中",
  "211300" : "朝阳",
  "320500" : "苏州",
  "433100" : "湘西",
  "450100" : "南宁",
  "540500" : "山南",
  "620100" : "兰州",
  "410400" : "平顶山",
  "330400" : "嘉兴",
  "460100" : "海口",
  "441700" : "阳江",
  "632600" : "果洛",
  "442000" : "中山",
  "370700" : "潍坊",
  "610300" : "宝鸡",
  "210900" : "阜新",
  "420200" : "黄石",
  "340200" : "芜湖",
  "510400" : "攀枝花",
  "520100" : "贵阳",
  "210100" : "沈阳",
  "371100" : "日照",
  "130400" : "邯郸",
  "411500" : "信阳",
  "430800" : "张家界",
  "440600" : "佛山",
  "533300" : "怒江",
  "420100" : "武汉",
  "350300" : "莆田",
  "220700" : "松原",
  "230500" : "双鸭山",
  "150800" : "巴彦淖尔",
  "360100" : "南昌",
  "421300" : "随州",
  "530700" : "丽江",
  "140200" : "大同",
  "630200" : "海东",
  "450400" : "梧州",
  "360900" : "宜春",
  "211200" : "铁岭",
  "320600" : "南通",
  "511600" : "广安",
  "431100" : "永州",
  "620200" : "嘉峪关",
  "211100" : "盘锦",
  "410300" : "洛阳",
  "511400" : "眉山",
  "532300" : "楚雄",
  "330500" : "湖州",
  "441600" : "河源",
  "632500" : "海南州",
  "421200" : "咸宁",
  "370600" : "烟台",
  "310100" : "上海",
  "460200" : "三亚",
  "610400" : "咸阳",
  "420900" : "孝感",
  "654300" : "阿勒泰",
  "520200" : "六盘水",
  "451400" : "崇左",
  "210800" : "营口",
  "340300" : "蚌埠",
  "321000" : "扬州",
  "411400" : "商丘",
  "371000" : "威海",
  "510300" : "自贡",
  "130300" : "秦皇岛",
  "430700" : "常德",
  "533400" : "迪庆",
  "440500" : "汕头",
  "350200" : "厦门",
  "610500" : "渭南",
  "652900" : "阿克苏",
  "220600" : "白山",
  "530800" : "普洱",
  "230400" : "鹤岗",
  "140100" : "太原",
  "630100" : "西宁",
  "150700" : "呼伦贝尔",
  "653200" : "和田",
  "320700" : "连云港",
  "450300" : "桂林",
  "410200" : "开封",
  "511500" : "宜宾",
  "152200" : "兴安盟",
  "140900" : "忻州",
  "360800" : "吉安",
  "232700" : "大兴安岭",
  "341500" : "六安",
  "431000" : "郴州",
  "131000" : "廊坊",
  "431300" : "娄底",
  "620300" : "金昌",
  "511300" : "南充",
  "211000" : "辽阳",
  "410600" : "鹤壁",
  "540300" : "昌都",
  "441900" : "东莞",
  "330600" : "绍兴",
  "370500" : "东营",
  "460300" : "三沙",
  "361100" : "上饶",
  "654200" : "塔城",
  "120100" : "天津",
  "210700" : "锦州",
  "321200" : "泰州",
  "340400" : "淮南",
  "430200" : "株洲",
  "321100" : "镇江",
  "350900" : "宁德",
  "650500" : "哈密",
  "411700" : "驻马店",
  "440800" : "湛江",
  "623000" : "甘南",
  "130600" : "保定",
  "350100" : "福州",
  "533100" : "德宏",
  "220500" : "通化",
  "652800" : "巴音郭楞",
  "371700" : "菏泽",
  "610600" : "延安",
  "230300" : "鸡西",
  "532800" : "西双版纳",
  "530500" : "保山",
  "632300" : "黄南",
  "653100" : "喀什",
  "140400" : "长治",
  "150200" : "包头",
  "152500" : "锡林郭勒",
  "320800" : "淮安",
  "450600" : "防城港",
  "360700" : "赣州",
  "620400" : "白银",
  "341600" : "亳州",
  "431200" : "怀化",
  "410500" : "安阳",
  "540400" : "林芝",
  "441800" : "清远",
  "330700" : "金华",
  "370400" : "枣庄",
  "460400" : "儋州",
  "420300" : "十堰",
  "331000" : "台州",
  "361000" : "抚州",
  "522300" : "黔西南",
  "340500" : "马鞍山",
  "210600" : "丹东",
  "321300" : "宿迁",
  "510900" : "遂宁",
  "430100" : "长沙",
  "350800" : "龙岩",
  "510100" : "成都",
  "650400" : "吐鲁番",
  "130500" : "邢台",
  "411600" : "周口",
  "440700" : "江门",
  "430900" : "益阳",
  "331100" : "丽水",
  "371600" : "滨州",
  "610700" : "汉中",
  "652700" : "博尔塔拉",
  "220400" : "辽源",
  "150900" : "乌兰察布",
  "530600" : "昭通",
  "532900" : "大理",
  "230200" : "齐齐哈尔",
  "653000" : "克孜勒苏",
  "611000" : "商洛",
  "140300" : "阳泉",
  "320900" : "盐城",
  "632200" : "海北",
  "710000" : "台湾",
  "150100" : "呼和浩特",
  "450500" : "北海",
  "341700" : "池州",
  "620500" : "天水",
  "320100" : "南京",
  "360600" : "鹰潭",
  "410800" : "焦作",
  "370300" : "淄博",
  "330800" : "衢州",
  "540100" : "拉萨",
  "542400" : "那区",
  "511100" : "乐山",
  "513400" : "凉山",
  "110100" : "北京",
  "441300" : "惠州",
  "141000" : "临汾",
  "654000" : "伊犁",
  "420600" : "襄阳",
  "411100" : "漯河",
  "231200" : "绥化",
  "640500" : "中卫",
  "451100" : "贺州",
  "820000" : "澳门",
  "340600" : "淮北",
  "510800" : "广元",
  "210500" : "本溪",
  "350700" : "南平",
  "430400" : "衡阳",
  "130800" : "承德",
  "220300" : "四平",
  "520500" : "毕节",
  "371500" : "聊城",
  "440200" : "韶关",
  "445100" : "潮州",
  "610800" : "榆林",
  "341800" : "宣城",
  "450800" : "贵港",
  "230100" : "哈尔滨",
  "532600" : "文山",
  "150400" : "赤峰",
  "530300" : "曲靖",
  "140600" : "朔州",
  "341000" : "黄山",
  "230900" : "七台河",
  "360500" : "新余",
  "620600" : "武威",
  "622900" : "临夏",
  "320200" : "无锡",
  "131100" : "衡水",
  "410700" : "新乡",
  "511000" : "内江",
  "370200" : "青岛",
  "330900" : "舟山",
  "540200" : "日喀则",
  "513300" : "甘孜",
  "542500" : "阿里",
  "330100" : "杭州",
  "441200" : "肇庆",
  "420500" : "宜昌",
  "422800" : "恩施州",
  "340700" : "铜陵",
  "210400" : "抚顺",
  "231100" : "黑河",
  "411000" : "许昌",
  "510700" : "绵阳",
  "640400" : "固原",
  "451000" : "百色",
  "350600" : "漳州",
  "371400" : "德州",
  "430300" : "湘潭",
  "440900" : "茂名",
  "621000" : "庆阳",
  "650200" : "克拉玛依",
  "610900" : "安康",
  "130700" : "张家口",
  "220200" : "吉林",
  "520600" : "铜仁",
  "440100" : "广州",
  "360400" : "九江",
  "530400" : "玉溪",
  "450700" : "钦州",
  "500100" : "重庆",
  "140500" : "晋城",
  "150300" : "乌海",
  "341100" : "滁州",
  "320300" : "徐州",
  "230800" : "佳木斯",
  "511900" : "巴中",
  "620700" : "张掖"
};