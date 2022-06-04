export default function EditProfile() {
  return (
    <div className="mt-8">
      <span className="ml-20 bg-orange-200 text-orange-800 font-bold px-6  py-1 rounded-full text-lg">
        Edit Information
      </span>
      <div class="w-full md:w-3/5 p-8 bg-white lg:ml-20 relative">
        <div class="rounded  shadow p-6  ">
          <div class="pb-6">
            <label for="name" class="font-semibold text-gray-700 block pb-1">
              Name
            </label>
            <div class="flex">
              <input
                
                id="username"
                class="border-1  rounded-r px-4 py-2 w-full"
                type="text"
                placeholder="Edit your name"
              />
            </div>
          </div>
          <div class="pb-4">
            <label for="about" class="font-semibold text-gray-700 block pb-1">
              Email
            </label>
            <input
              
              id="email"
              class="border-1  rounded-r px-4 py-2 w-full"
              type="email"
              placeholder="Edit your email address"
            />
            
          </div>
          <div class="pb-4">
            <label for="about" class="font-semibold text-gray-700 block pb-1">
              Password
            </label>
            <input
              
              id="email"
              class="border-1  rounded-r px-4 py-2 w-full"
              type="email"
              value="******"
            />
            
          </div>
          <div class="pb-8">
          <button className="text-gray-900 font-bold rounded-full px-8 py-1 absolute border-2 border-gray-900  mr-10">Save</button>

          </div>
        </div>
      </div>
    </div>
  );
}
