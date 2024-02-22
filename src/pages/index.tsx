import RootLayout from "./layout"

const HomePage = () => {
    return (
        <div className="min-h-[100dvh] flex justify-center items-center">
            <p>hi สวัสดีครับ</p>
        </div>
    )
}

HomePage.getLayout = function getLayout(page: ReactElement) {
    return (
      <RootLayout>
         {page}
      </RootLayout>
    )
}

export default HomePage