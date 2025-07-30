export const UserTrsansaction = () = {
    return (
        <div >
          <UserProfile />
          <div className="flex justify-between items-center p-4">
            <p>Recent Transactions</p>
            <Button variant={"ghost"}>
              <ArrowDown /> Amount
            </Button>
          </div>
          <div className="border border-gray-200 rounded-lg w-[955px] h-[960px]p-4">
            <div className=" flex   flex-col ">
              {Array.from({ length: 6 }).map((_, i) => (
                <Transaction key={i} />
              ))}
            </div>
          </div>
    )
}
export default UserTrsansaction;