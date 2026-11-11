const getVisibilityFilter=(user)=>{
         return {   $or:[
                {
                    visibility:"CAMPUS"
                },
                {
                    visibility:"GENDER",
                    "target.gender":user.gender
                },
                {
                    visibility:"HOSTEL",
                    "target.hostel":user.hostel
                },
                {
                    visibility:"DEPARTMENT",
                    "target.department":user.department
                }
            ]
            }
        }
export {getVisibilityFilter}