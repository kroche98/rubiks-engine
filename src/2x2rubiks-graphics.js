const imageLookup = {
    ufl: {
        0: {
            0: 'wkr',
            1: 'rkg',
            2: 'gkw'
        },
        1: {
            0: 'wkk',
            1: 'rkk',
            2: 'gkk'
        },
        2: {
            0: 'wgk',
            1: 'rwk',
            2: 'grk'
        },
        3: {
            0: 'wrg',
            1: 'rgw',
            2: 'gwr'
        },
        4: {
            0: 'kgr',
            1: 'kwg',
            2: 'krw'
        },
        5: {
            0: 'krk',
            1: 'kgk',
            2: 'kwk'
        },
        6: {
            0: 'kkk',
            1: 'kkk',
            2: 'kkk'
        },
        7: {
            0: 'kkg',
            1: 'kkw',
            2: 'kkr'
        }
    },
    ulb: {
        0: {
            0: 'wkg',
            1: 'gko',
            2: 'okw'
        },
        1: {
            0: 'wkk',
            1: 'gkk',
            2: 'okk'
        },
        2: {
            0: 'wok',
            1: 'gwk',
            2: 'ogk'
        },
        3: {
            0: 'wgo',
            1: 'gow',
            2: 'owg'
        },
        4: {
            0: 'kog',
            1: 'kwo',
            2: 'kgw'
        },
        5: {
            0: 'kgk',
            1: 'kok',
            2: 'kwk'
        },
        6: {
            0: 'kkk',
            1: 'kkk',
            2: 'kkk'
        },
        7: {
            0: 'kko',
            1: 'kkw',
            2: 'kkg'
        }
    },
    ubr: {
        0: {
            0: 'wko',
            1: 'okb',
            2: 'bkw'
        },
        1: {
            0: 'wkk',
            1: 'okk',
            2: 'bkk'
        },
        2: {
            0: 'wbk',
            1: 'owk',
            2: 'bok'
        },
        3: {
            0: 'wob',
            1: 'obw',
            2: 'bwo'
        },
        4: {
            0: 'kbo',
            1: 'kwb',
            2: 'kow'
        },
        5: {
            0: 'kok',
            1: 'kbk',
            2: 'kwk'
        },
        6: {
            0: 'kkk',
            1: 'kkk',
            2: 'kkk'
        },
        7: {
            0: 'kkb',
            1: 'kkw',
            2: 'kko'
        }
    },
    urf: {
        0: {
            0: 'wkb',
            1: 'bkr',
            2: 'rkw'
        },
        1: {
            0: 'wkk',
            1: 'bkk',
            2: 'rkk'
        },
        2: {
            0: 'wrk',
            1: 'bwk',
            2: 'rbk'
        },
        3: {
            0: 'wbr',
            1: 'brw',
            2: 'rwb'
        },
        4: {
            0: 'krb',
            1: 'kwr',
            2: 'kbw'
        },
        5: {
            0: 'kbk',
            1: 'krk',
            2: 'kwk'
        },
        6: {
            0: 'kkk',
            1: 'kkk',
            2: 'kkk'
        },
        7: {
            0: 'kkr',
            1: 'kkw',
            2: 'kkb'
        }
    },
    dfr: {
        0: {
            0: 'ykr',
            1: 'rkb',
            2: 'bky'
        },
        1: {
            0: 'ykk',
            1: 'rkk',
            2: 'bkk'
        },
        2: {
            0: 'ybk',
            1: 'ryk',
            2: 'brk'
        },
        3: {
            0: 'yrb',
            1: 'rby',
            2: 'byr'
        },
        4: {
            0: 'kbr',
            1: 'kyb',
            2: 'kry'
        },
        5: {
            0: 'krk',
            1: 'kbk',
            2: 'kyk'
        },
        6: {
            0: 'kkk',
            1: 'kkk',
            2: 'kkk'
        },
        7: {
            0: 'kkb',
            1: 'kky',
            2: 'kkr'
        }
    },
    drb: {
        0: {
            0: 'ykb',
            1: 'bko',
            2: 'oky'
        },
        1: {
            0: 'ykk',
            1: 'bkk',
            2: 'okk'
        },
        2: {
            0: 'yok',
            1: 'byk',
            2: 'obk'
        },
        3: {
            0: 'ybo',
            1: 'boy',
            2: 'oyb'
        },
        4: {
            0: 'kob',
            1: 'kyo',
            2: 'kby'
        },
        5: {
            0: 'kbk',
            1: 'kok',
            2: 'kyk'
        },
        6: {
            0: 'kkk',
            1: 'kkk',
            2: 'kkk'
        },
        7: {
            0: 'kko',
            1: 'kky',
            2: 'kkb'
        }
    },
    dbl: {
        0: {
            0: 'yko',
            1: 'okg',
            2: 'gky'
        },
        1: {
            0: 'ykk',
            1: 'okk',
            2: 'gkk'
        },
        2: {
            0: 'ygk',
            1: 'oyk',
            2: 'gok'
        },
        3: {
            0: 'yog',
            1: 'ogy',
            2: 'gyo'
        },
        4: {
            0: 'kgo',
            1: 'kyg',
            2: 'koy'
        },
        5: {
            0: 'kok',
            1: 'kgk',
            2: 'kyk'
        },
        6: {
            0: 'kkk',
            1: 'kkk',
            2: 'kkk'
        },
        7: {
            0: 'kkg',
            1: 'kky',
            2: 'kko'
        }
    },
    dlf: {
        0: {
            0: 'ykg',
            1: 'gkr',
            2: 'rky'
        },
        1: {
            0: 'ykk',
            1: 'gkk',
            2: 'rkk'
        },
        2: {
            0: 'yrk',
            1: 'gyk',
            2: 'rgk'
        },
        3: {
            0: 'ygr',
            1: 'gry',
            2: 'ryg'
        },
        4: {
            0: 'krg',
            1: 'kyr',
            2: 'kgy'
        },
        5: {
            0: 'kgk',
            1: 'krk',
            2: 'kyk'
        },
        6: {
            0: 'kkk',
            1: 'kkk',
            2: 'kkk'
        },
        7: {
            0: 'kkr',
            1: 'kky',
            2: 'kkg'
        }
    }
}

export { imageLookup };