export interface IFloorData {
    floor: number
    room: string[]
}
export interface IRoomData {
    place: string
    place_name_th: string
    place_name_en: string
    banner: string
    floors: IFloorData[]
}

export const roomsDummy = [
    {
        "place": "EN",
        "place_name_th": "คณะวิศวกรรมศาสตร์",
        "place_name_en": "Engineering",
        "banner": "https://www.msu.ac.th/wp-content/uploads/2022/06/eng.jpg",
        "floors": [
            {
                "floor": 1,
                "room": [
                    "EN101",
                    "EN102",
                    "EN103",
                    "EN104",
                    "EN105",
                    "EN106",
                    "EN107",
                    "EN109",
                    "EN110",
                    "EN111",
                    "EN112",
                    "EN113",
                    "EN114"
                ]
            },{
                "floor": 2,
                "room": [
                    "EN201",
                    "EN202",
                    "EN203",
                    "EN204",
                    "EN205",
                    "EN206",
                    "EN207",
                    "EN211",
                    "EN212",
                    "EN213",
                    "EN214",
                    "EN217",
                    "EN218"
                ]
            },{
                "floor": 3,
                "room": [
                    "EN301",
                    "EN302",
                    "EN303",
                    "EN304",
                    "EN305",
                    "EN306",
                    "EN307",
                    "EN308",
                    "EN309",
                    "EN310",
                    "EN311",
                    "EN312",
                    "EN313",
                    "EN315",
                    "EN316",
                    "EN317",
                    "EN318"
                ]
            },{
                "floor": 4,
                "room": [
                    "EN401",
                    "EN402",
                    "EN403",
                    "EN404",
                    "EN405",
                    "EN406",
                    "EN407",
                    "EN408",
                    "EN409",
                    "EN410",
                    "EN411",
                    "EN412",
                    "EN413",
                    "EN414",
                    "EN415",
                    "EN416",
                    "EN417",
                    "EN418"
                ]
            }
        ]
    },
    {
        "place": "FAC IT",
        "place_name_th": "คณะวิทยาการสารสนเทศ",
        "place_name_en": "Facualty Information Technology",
        "banner": "https://www.msu.ac.th/wp-content/uploads/2022/06/it.jpg",
        "floors": [
            {
                "floor": 1,
                "room": [
                    "IT-101",
                    "IT-102",
                    "IT-103",
                    "IT-104",
                    "IT-105",
                    "IT-106",
                    "IT-107",
                    "IT-108",
                    "IT-109",
                    "IT-110-1",
                    "IT-110-2",
                    "IT-111-1",
                    "IT-111-2",
                    "IT-112",
                    "IT-114",
                    "IT-118",
                    "IT-Glass R",
                    "IT-ISAN",
                ]
            },{
                "floor": 2,
                "room": [
                    "IT-202",
                    "IT-203",
                    "IT-211",
                    "IT-212",
                    "IT-213",
                    "IT-214",
                ]
            },{
                "floor": 3,
                "room": [
                    "IT-308",
                    "IT-312",
                    "IT-314",
                ]
            },{
                "floor": 4,
                "room": [
                    "IT-401",
                    "IT-402",
                    "IT-403",
                    "IT-404",
                    "IT-405",
                    "IT-406",
                    "IT-407",
                    "IT-409",
                    "IT-410",
                    "IT-411",
                    "IT-412",
                    "IT-413",
                    "IT-Work4-1",
                    "IT-Work4-2",
                ]
            },{
                "floor": 5,
                "room": [
                    "IT-501",
                    "IT-502",
                    "IT-504",
                    "IT-505",
                    "IT-507-1",
                    "IT-507-2",
                    "IT-508",
                    "IT-509",
                    "IT-510",
                    "IT-511",
                    "IT-512",
                    "IT-513",
                    "IT-MV",
                    "IT-Mo Cap",
                    "IT-Online1",
                    "IT-Online2",
                    "IT-Online3",
                    "IT-SMART",
                    "IT-Studio",
                    "IT-Work5-2"
                ]
            }
        ]
    }
]