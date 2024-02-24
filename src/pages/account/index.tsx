import PlainPageLayout from "@/app/layout/plainlayout"
import { ReactElement } from "react"

function ProfilePage(props:any){
    return <>
        Profile First Started Page
    </>
}

ProfilePage.getLayout = function getLayout(page: ReactElement) {
    return (
      <PlainPageLayout>
         {page}
      </PlainPageLayout>
    )
  }
  
export default ProfilePage