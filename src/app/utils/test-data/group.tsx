export type IGroupFacultyData = {
  fac_id: string;
  fac_key: string;
  name_en: string;
  name_th: string;
  banner: string;
  majors: Array<IGroupMajorData>;
};
export type IGroupMajorData = {
  course_code: string;
  major_key: string;
  name_en: string;
  name_th: string;
};
export const groupDummy = [
  {
    fac_id: '12*',
    fac_key: 'IT',
    name_en: 'Information Technology',
    name_th: 'คณะวิทยาการสารสนเทศ',
    banner: 'https://www.msu.ac.th/wp-content/uploads/2022/06/it.jpg',
    majors: [
      {
        course_code: '1203*',
        major_key: 'CMD',
        name_en: 'Com art',
        name_th: 'ซีเอ็มดี',
      },
      {
        course_code: '1204*',
        major_key: 'CS',
        name_en: 'Computer Science',
        name_th: 'วิทยาการคอมพิวเตอร์',
      },
    ],
  },
];
