export type IGroupFacultyData = {
  fac_id: string;
  fac_key: string;
  fac_name_en: string;
  fac_name_th: string;
  bg_img: string;
  bg_color: string;
  icon: string;
  place_key: string;
  coursesets: Array<IGroupCoursesetGroupData>;
};
export type IGroupCoursesetGroupData = {
  cr_group_id: number;
  name_en: string;
  name_th: string;
  children: Array<IGroupCoursesetData>;
};
export type IGroupCoursesetData = {
  cr_key: string;
  name_en: string;
  name_th: string;
  children: Array<IGroupMajorData>;
};
export type IGroupMajorData = {
  cr_id: string;
  courseset_id: number;
  cr_group_id: number;
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
