import React from 'react'

const AdminRoutes = () => {
  return (
    <div className={`App ${IsOpen ? "" : "open"}`}>
        
        <AuthProvider>
          {isConn && <SideNav user={user} deconexion={deconexion} IsOpen={IsOpen} setIsOpen={setIsOpen} togleSidebar={togleSidebar} comments={comments} togleNot={togleNot}/>}
          {isConn && <Comments comments={comments} setComments={setComments} user={user} IsOpenNot={IsOpenNot} togleNot={togleNot}/>}
          <Routes>
            <Route index element={<Login 
            isConn={isConn} setIsConn={setIsConn} saveCon={saveCon}
            user={user} setUser={setUser} getCon={getCon} 
            />} />
            <Route
              path="/login"
              element={<Login isConn={isConn} setIsConn={setIsConn} saveCon={saveCon}
              user={user} setUser={setUser} getCon={getCon} />}
            />
            <Route path="/Main" element={<MainDash />}/>
            <Route element={<ProtectedRoute user={user} perm={true}/>}>
              <Route path="/Profile" element={<Profile user={user} />} />
              <Route path="/Comments" element={<Comments comments={comments} setComments={setComments} user={user} IsOpenNot={IsOpenNot} />} />
              <Route element={<ProtectedRoute redirectPath="/Dashboard" user={user} perm={'admin'}/>}>
                <Route path="/Signup" element={<Signup />} />
                <Route path="/UserList" element={<UserList />} />
                <Route path="/ModUser" element={<ModUser />} />
              </Route>
            </Route>
            
          <Route path="/*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </AuthProvider>
      </div>
  )
}

export default AdminRoutes