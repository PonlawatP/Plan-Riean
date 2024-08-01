import { CalendarContext } from '@/app/providers/CalendarProvider';
import Head from 'next/head';
import { ReactElement, useContext, useEffect, useState } from 'react';
import PlanPageLayout, { newPlanReset } from '@/app/layout/planlayout';
import { useSession } from 'next-auth/react';
import { Player } from '@lottiefiles/react-lottie-player';
import { getUniversityData, getUniversitySeasons } from '@/app/utils/universityAPI';
import SubjectsMappingPage from '../../subject-map';
import { useRouter } from 'next/router';

function SubjectsMappingPlanPage() {
  const { plan_id } = useRouter().query;
  return <SubjectsMappingPage plan_id={plan_id}></SubjectsMappingPage>;
}

SubjectsMappingPlanPage.getLayout = function getLayout(page: ReactElement) {
  return <PlanPageLayout>{page}</PlanPageLayout>;
};

export default SubjectsMappingPlanPage;
