import AddPost from "@/components/AddPost"
import Feed from "@/components/Feed"
import LeftMenu from "@/components/LeftMenu"
import RightMenu from "@/components/RightMenu"
import Stories from "@/components/Stories"

const Homepage = () => {
  return (
    <div className='flex gap-6'>
      {/* LEFT */}
      <div className="bg-gray-300 hidden xl:block w-[20%]">
        <LeftMenu />
      </div>
      {/* CENTER */}
      <div className="bg-red-300 w-full lg:w-[70%] xl:w-[50%]">
        <Stories />
        <AddPost />
        <Feed />
      </div>
      {/* RIGHT */}
      <div className="bg-blue-300 hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  )
}

export default Homepage