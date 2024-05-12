export type IGroupFacultyData = {
  fac_id: string;
  fac_key: string;
  name_en: string;
  name_th: string;
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
    name_en: 'Informatic',
    name_th: 'วิทยาการสารสนเทศ',
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
