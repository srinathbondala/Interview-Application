import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, Grid} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'; 

const data = [
    {
        personalData: {
            firstName: "John",
            lastName: "Doe",
            phone: "123-456-7890",
            address: "123 Main St, Anytown, USA",
            dateOfBirth: "1990-01-01"
        },
        educationData: {
            education: {
                college: "State University",
                grade: "A",
                passingYear: 2012,
                branch: "Computer Science"
            },
            intermediate: {
                institute: "ABC College",
                stream: "Science",
                grade: "A",
                passedYear: 2008
            },
            school: {
                schoolName: "XYZ High School",
                grade: "A",
                passedYear: 2006
            }
        },
        professionalData: {
            role: "Software Engineer",
            skills: ["JavaScript", "React", "Node.js"],
            achievements: "Employee of the Year 2020",
            experience: "5 years",
            resume: "link-to-resume-john.pdf"
        }
    },
    {
        personalData: {
            firstName: "Jane",
            lastName: "Smith",
            phone: "987-654-3210",
            address: "456 Elm St, Othertown, USA",
            dateOfBirth: "1992-02-02"
        },
        educationData: {
            education: {
                college: "Tech Institute",
                grade: "B+",
                passingYear: 2014,
                branch: "Information Technology"
            },
            intermediate: {
                institute: "DEF College",
                stream: "Commerce",
                grade: "B",
                passedYear: 2010
            },
            school: {
                schoolName: "UVW High School",
                grade: "B+",
                passedYear: 2008
            }
        },
        professionalData: {
            role: "Web Developer",
            skills: ["HTML", "CSS", "JavaScript"],
            achievements: "Best Project Award 2021",
            experience: "3 years",
            resume: "link-to-resume-jane.pdf"
        }
    },
    {
        personalData: {
            firstName: "Emily",
            lastName: "Johnson",
            phone: "555-0123-4567",
            address: "789 Pine St, Sometown, USA",
            dateOfBirth: "1988-03-15"
        },
        educationData: {
            education: {
                college: "City College",
                grade: "A-",
                passingYear: 2010,
                branch: "Graphic Design"
            },
            intermediate: {
                institute: "GHI College",
                stream: "Arts",
                grade: "A",
                passedYear: 2006
            },
            school: {
                schoolName: "JKL High School",
                grade: "A",
                passedYear: 2004
            }
        },
        professionalData: {
            role: "Graphic Designer",
            skills: ["Photoshop", "Illustrator", "InDesign"],
            achievements: "Design Award 2019",
            experience: "4 years",
            resume: "link-to-resume-emily.pdf"
        }
    },
    {
        personalData: {
            firstName: "Michael",
            lastName: "Brown",
            phone: "321-654-0987",
            address: "159 Maple St, Yourtown, USA",
            dateOfBirth: "1995-05-20"
        },
        educationData: {
            education: {
                college: "State University",
                grade: "B",
                passingYear: 2016,
                branch: "Electrical Engineering"
            },
            intermediate: {
                institute: "MNO College",
                stream: "Science",
                grade: "A-",
                passedYear: 2012
            },
            school: {
                schoolName: "PQR High School",
                grade: "B+",
                passedYear: 2010
            }
        },
        professionalData: {
            role: "Electrical Engineer",
            skills: ["Circuit Design", "MATLAB", "C++"],
            achievements: "Innovator of the Year 2021",
            experience: "3 years",
            resume: "link-to-resume-michael.pdf"
        }
    },
    {
        personalData: {
            firstName: "Sophia",
            lastName: "Davis",
            phone: "456-789-0123",
            address: "321 Oak St, Anycity, USA",
            dateOfBirth: "1993-07-25"
        },
        educationData: {
            education: {
                college: "Tech University",
                grade: "A",
                passingYear: 2015,
                branch: "Data Science"
            },
            intermediate: {
                institute: "PQR College",
                stream: "Science",
                grade: "A",
                passedYear: 2011
            },
            school: {
                schoolName: "STU High School",
                grade: "A+",
                passedYear: 2009
            }
        },
        professionalData: {
            role: "Data Scientist",
            skills: ["Python", "R", "SQL"],
            achievements: "Data Innovation Award 2022",
            experience: "4 years",
            resume: "link-to-resume-sophia.pdf"
        }
    },
    {
        personalData: {
            firstName: "John",
            lastName: "Doe",
            phone: "123-456-7890",
            address: "123 Main St, Anytown, USA",
            dateOfBirth: "1990-01-01"
        },
        educationData: {
            education: {
                college: "State University",
                grade: "A",
                passingYear: 2012,
                branch: "Computer Science"
            },
            intermediate: {
                institute: "ABC College",
                stream: "Science",
                grade: "A",
                passedYear: 2008
            },
            school: {
                schoolName: "XYZ High School",
                grade: "A",
                passedYear: 2006
            }
        },
        professionalData: {
            role: "Software Engineer",
            skills: ["JavaScript", "React", "Node.js"],
            achievements: "Employee of the Year 2020",
            experience: "5 years",
            resume: "link-to-resume-john.pdf"
        }
    },
    {
        personalData: {
            firstName: "Jane",
            lastName: "Smith",
            phone: "987-654-3210",
            address: "456 Elm St, Othertown, USA",
            dateOfBirth: "1992-02-02"
        },
        educationData: {
            education: {
                college: "Tech Institute",
                grade: "B+",
                passingYear: 2014,
                branch: "Information Technology"
            },
            intermediate: {
                institute: "DEF College",
                stream: "Commerce",
                grade: "B",
                passedYear: 2010
            },
            school: {
                schoolName: "UVW High School",
                grade: "B+",
                passedYear: 2008
            }
        },
        professionalData: {
            role: "Web Developer",
            skills: ["HTML", "CSS", "JavaScript"],
            achievements: "Best Project Award 2021",
            experience: "3 years",
            resume: "link-to-resume-jane.pdf"
        }
    },
    {
        personalData: {
            firstName: "Emily",
            lastName: "Johnson",
            phone: "555-0123-4567",
            address: "789 Pine St, Sometown, USA",
            dateOfBirth: "1988-03-15"
        },
        educationData: {
            education: {
                college: "City College",
                grade: "A-",
                passingYear: 2010,
                branch: "Graphic Design"
            },
            intermediate: {
                institute: "GHI College",
                stream: "Arts",
                grade: "A",
                passedYear: 2006
            },
            school: {
                schoolName: "JKL High School",
                grade: "A",
                passedYear: 2004
            }
        },
        professionalData: {
            role: "Graphic Designer",
            skills: ["Photoshop", "Illustrator", "InDesign"],
            achievements: "Design Award 2019",
            experience: "4 years",
            resume: "link-to-resume-emily.pdf"
        }
    },
    {
        personalData: {
            firstName: "Michael",
            lastName: "Brown",
            phone: "321-654-0987",
            address: "159 Maple St, Yourtown, USA",
            dateOfBirth: "1995-05-20"
        },
        educationData: {
            education: {
                college: "State University",
                grade: "B",
                passingYear: 2016,
                branch: "Electrical Engineering"
            },
            intermediate: {
                institute: "MNO College",
                stream: "Science",
                grade: "A-",
                passedYear: 2012
            },
            school: {
                schoolName: "PQR High School",
                grade: "B+",
                passedYear: 2010
            }
        },
        professionalData: {
            role: "Electrical Engineer",
            skills: ["Circuit Design", "MATLAB", "C++"],
            achievements: "Innovator of the Year 2021",
            experience: "3 years",
            resume: "link-to-resume-michael.pdf"
        }
    },
    {
        personalData: {
            firstName: "Sophia",
            lastName: "Davis",
            phone: "456-789-0123",
            address: "321 Oak St, Anycity, USA",
            dateOfBirth: "1993-07-25"
        },
        educationData: {
            education: {
                college: "Tech University",
                grade: "A",
                passingYear: 2015,
                branch: "Data Science"
            },
            intermediate: {
                institute: "PQR College",
                stream: "Science",
                grade: "A",
                passedYear: 2011
            },
            school: {
                schoolName: "STU High School",
                grade: "A+",
                passedYear: 2009
            }
        },
        professionalData: {
            role: "Data Scientist",
            skills: ["Python", "R", "SQL"],
            achievements: "Data Innovation Award 2022",
            experience: "4 years",
            resume: "link-to-resume-sophia.pdf"
        }
    },
    {
        personalData: {
            firstName: "John",
            lastName: "Doe",
            phone: "123-456-7890",
            address: "123 Main St, Anytown, USA",
            dateOfBirth: "1990-01-01"
        },
        educationData: {
            education: {
                college: "State University",
                grade: "A",
                passingYear: 2012,
                branch: "Computer Science"
            },
            intermediate: {
                institute: "ABC College",
                stream: "Science",
                grade: "A",
                passedYear: 2008
            },
            school: {
                schoolName: "XYZ High School",
                grade: "A",
                passedYear: 2006
            }
        },
        professionalData: {
            role: "Software Engineer",
            skills: ["JavaScript", "React", "Node.js"],
            achievements: "Employee of the Year 2020",
            experience: "5 years",
            resume: "link-to-resume-john.pdf"
        }
    },
    {
        personalData: {
            firstName: "Jane",
            lastName: "Smith",
            phone: "987-654-3210",
            address: "456 Elm St, Othertown, USA",
            dateOfBirth: "1992-02-02"
        },
        educationData: {
            education: {
                college: "Tech Institute",
                grade: "B+",
                passingYear: 2014,
                branch: "Information Technology"
            },
            intermediate: {
                institute: "DEF College",
                stream: "Commerce",
                grade: "B",
                passedYear: 2010
            },
            school: {
                schoolName: "UVW High School",
                grade: "B+",
                passedYear: 2008
            }
        },
        professionalData: {
            role: "Web Developer",
            skills: ["HTML", "CSS", "JavaScript"],
            achievements: "Best Project Award 2021",
            experience: "3 years",
            resume: "link-to-resume-jane.pdf"
        }
    },
    {
        personalData: {
            firstName: "Emily",
            lastName: "Johnson",
            phone: "555-0123-4567",
            address: "789 Pine St, Sometown, USA",
            dateOfBirth: "1988-03-15"
        },
        educationData: {
            education: {
                college: "City College",
                grade: "A-",
                passingYear: 2010,
                branch: "Graphic Design"
            },
            intermediate: {
                institute: "GHI College",
                stream: "Arts",
                grade: "A",
                passedYear: 2006
            },
            school: {
                schoolName: "JKL High School",
                grade: "A",
                passedYear: 2004
            }
        },
        professionalData: {
            role: "Graphic Designer",
            skills: ["Photoshop", "Illustrator", "InDesign"],
            achievements: "Design Award 2019",
            experience: "4 years",
            resume: "link-to-resume-emily.pdf"
        }
    },
    {
        personalData: {
            firstName: "Michael",
            lastName: "Brown",
            phone: "321-654-0987",
            address: "159 Maple St, Yourtown, USA",
            dateOfBirth: "1995-05-20"
        },
        educationData: {
            education: {
                college: "State University",
                grade: "B",
                passingYear: 2016,
                branch: "Electrical Engineering"
            },
            intermediate: {
                institute: "MNO College",
                stream: "Science",
                grade: "A-",
                passedYear: 2012
            },
            school: {
                schoolName: "PQR High School",
                grade: "B+",
                passedYear: 2010
            }
        },
        professionalData: {
            role: "Electrical Engineer",
            skills: ["Circuit Design", "MATLAB", "C++"],
            achievements: "Innovator of the Year 2021",
            experience: "3 years",
            resume: "link-to-resume-michael.pdf"
        }
    },
    {
        personalData: {
            firstName: "Sophia",
            lastName: "Davis",
            phone: "456-789-0123",
            address: "321 Oak St, Anycity, USA",
            dateOfBirth: "1993-07-25"
        },
        educationData: {
            education: {
                college: "Tech University",
                grade: "A",
                passingYear: 2015,
                branch: "Data Science"
            },
            intermediate: {
                institute: "PQR College",
                stream: "Science",
                grade: "A",
                passedYear: 2011
            },
            school: {
                schoolName: "STU High School",
                grade: "A+",
                passedYear: 2009
            }
        },
        professionalData: {
            role: "Data Scientist",
            skills: ["Python", "R", "SQL"],
            achievements: "Data Innovation Award 2022",
            experience: "4 years",
            resume: "link-to-resume-sophia.pdf"
        }
    },
    {
        personalData: {
            firstName: "John",
            lastName: "Doe",
            phone: "123-456-7890",
            address: "123 Main St, Anytown, USA",
            dateOfBirth: "1990-01-01"
        },
        educationData: {
            education: {
                college: "State University",
                grade: "A",
                passingYear: 2012,
                branch: "Computer Science"
            },
            intermediate: {
                institute: "ABC College",
                stream: "Science",
                grade: "A",
                passedYear: 2008
            },
            school: {
                schoolName: "XYZ High School",
                grade: "A",
                passedYear: 2006
            }
        },
        professionalData: {
            role: "Software Engineer",
            skills: ["JavaScript", "React", "Node.js"],
            achievements: "Employee of the Year 2020",
            experience: "5 years",
            resume: "link-to-resume-john.pdf"
        }
    },
    {
        personalData: {
            firstName: "Jane",
            lastName: "Smith",
            phone: "987-654-3210",
            address: "456 Elm St, Othertown, USA",
            dateOfBirth: "1992-02-02"
        },
        educationData: {
            education: {
                college: "Tech Institute",
                grade: "B+",
                passingYear: 2014,
                branch: "Information Technology"
            },
            intermediate: {
                institute: "DEF College",
                stream: "Commerce",
                grade: "B",
                passedYear: 2010
            },
            school: {
                schoolName: "UVW High School",
                grade: "B+",
                passedYear: 2008
            }
        },
        professionalData: {
            role: "Web Developer",
            skills: ["HTML", "CSS", "JavaScript"],
            achievements: "Best Project Award 2021",
            experience: "3 years",
            resume: "link-to-resume-jane.pdf"
        }
    },
    {
        personalData: {
            firstName: "Emily",
            lastName: "Johnson",
            phone: "555-0123-4567",
            address: "789 Pine St, Sometown, USA",
            dateOfBirth: "1988-03-15"
        },
        educationData: {
            education: {
                college: "City College",
                grade: "A-",
                passingYear: 2010,
                branch: "Graphic Design"
            },
            intermediate: {
                institute: "GHI College",
                stream: "Arts",
                grade: "A",
                passedYear: 2006
            },
            school: {
                schoolName: "JKL High School",
                grade: "A",
                passedYear: 2004
            }
        },
        professionalData: {
            role: "Graphic Designer",
            skills: ["Photoshop", "Illustrator", "InDesign"],
            achievements: "Design Award 2019",
            experience: "4 years",
            resume: "link-to-resume-emily.pdf"
        }
    },
    {
        personalData: {
            firstName: "Michael",
            lastName: "Brown",
            phone: "321-654-0987",
            address: "159 Maple St, Yourtown, USA",
            dateOfBirth: "1995-05-20"
        },
        educationData: {
            education: {
                college: "State University",
                grade: "B",
                passingYear: 2016,
                branch: "Electrical Engineering"
            },
            intermediate: {
                institute: "MNO College",
                stream: "Science",
                grade: "A-",
                passedYear: 2012
            },
            school: {
                schoolName: "PQR High School",
                grade: "B+",
                passedYear: 2010
            }
        },
        professionalData: {
            role: "Electrical Engineer",
            skills: ["Circuit Design", "MATLAB", "C++"],
            achievements: "Innovator of the Year 2021",
            experience: "3 years",
            resume: "link-to-resume-michael.pdf"
        }
    },
    {
        personalData: {
            firstName: "Sophia",
            lastName: "Davis",
            phone: "456-789-0123",
            address: "321 Oak St, Anycity, USA",
            dateOfBirth: "1993-07-25"
        },
        educationData: {
            education: {
                college: "Tech University",
                grade: "A",
                passingYear: 2015,
                branch: "Data Science"
            },
            intermediate: {
                institute: "PQR College",
                stream: "Science",
                grade: "A",
                passedYear: 2011
            },
            school: {
                schoolName: "STU High School",
                grade: "A+",
                passedYear: 2009
            }
        },
        professionalData: {
            role: "Data Scientist",
            skills: ["Python", "R", "SQL"],
            achievements: "Data Innovation Award 2022",
            experience: "4 years",
            resume: "link-to-resume-sophia.pdf"
        }
    }
    ,
    {
        personalData: {
            firstName: "Sophia",
            lastName: "Davis",
            phone: "456-789-0123",
            address: "321 Oak St, Anycity, USA",
            dateOfBirth: "1993-07-25"
        },
        educationData: {
            education: {
                college: "Tech University",
                grade: "A",
                passingYear: 2015,
                branch: "Data Science"
            },
            intermediate: {
                institute: "PQR College",
                stream: "Science",
                grade: "A",
                passedYear: 2011
            },
            school: {
                schoolName: "STU High School",
                grade: "A+",
                passedYear: 2009
            }
        },
        professionalData: {
            role: "Data Scientist",
            skills: ["Python", "R", "SQL"],
            achievements: "Data Innovation Award 2022",
            experience: "4 years",
            resume: "link-to-resume-sophia.pdf"
        }
    }
    ,
    {
        personalData: {
            firstName: "Sophia",
            lastName: "Davis",
            phone: "456-789-0123",
            address: "321 Oak St, Anycity, USA",
            dateOfBirth: "1993-07-25"
        },
        educationData: {
            education: {
                college: "Tech University",
                grade: "A",
                passingYear: 2015,
                branch: "Data Science"
            },
            intermediate: {
                institute: "PQR College",
                stream: "Science",
                grade: "A",
                passedYear: 2011
            },
            school: {
                schoolName: "STU High School",
                grade: "A+",
                passedYear: 2009
            }
        },
        professionalData: {
            role: "Data Scientist",
            skills: ["Python", "R", "SQL"],
            achievements: "Data Innovation Award 2022",
            experience: "4 years",
            resume: "link-to-resume-sophia.pdf"
        }
    }
    ,
    {
        personalData: {
            firstName: "Sophia",
            lastName: "Davis",
            phone: "456-789-0123",
            address: "321 Oak St, Anycity, USA",
            dateOfBirth: "1993-07-25"
        },
        educationData: {
            education: {
                college: "Tech University",
                grade: "A",
                passingYear: 2015,
                branch: "Data Science"
            },
            intermediate: {
                institute: "PQR College",
                stream: "Science",
                grade: "A",
                passedYear: 2011
            },
            school: {
                schoolName: "STU High School",
                grade: "A+",
                passedYear: 2009
            }
        },
        professionalData: {
            role: "Data Scientist",
            skills: ["Python", "R", "SQL"],
            achievements: "Data Innovation Award 2022",
            experience: "4 years",
            resume: "link-to-resume-sophia.pdf"
        }
    }
    
];



const UserContent = () => {
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     axios.get('http://localhost:8080/user/allUsers')
    //         .then(response => {
    //             setData(response.data);
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }, []);

    // console.log(data);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'firstName', headerName: 'First Name', width: 150 },
        { field: 'lastName', headerName: 'Last Name', width: 150 },
        { field: 'phone', headerName: 'Phone', width: 150 },
        { field: 'address', headerName: 'Address', width: 200 },
        { field: 'dateOfBirth', headerName: 'Date of Birth', width: 150 },
        { field: 'college', headerName: 'College', width: 150 },
        { field: 'grade', headerName: 'Grade', width: 100 },
        { field: 'passingYear', headerName: 'Passing Year', width: 120 },
        { field: 'branch', headerName: 'Branch', width: 150 },
        { field: 'intermediateInstitute', headerName: 'Intermediate Institute', width: 200 },
        { field: 'intermediateStream', headerName: 'Intermediate Stream', width: 150 },
        { field: 'intermediateGrade', headerName: 'Intermediate Grade', width: 100 },
        { field: 'intermediateYear', headerName: 'Intermediate Year', width: 120 },
        { field: 'schoolName', headerName: 'School Name', width: 200 },
        { field: 'schoolGrade', headerName: 'School Grade', width: 100 },
        { field: 'schoolYear', headerName: 'School Year', width: 120 },
        { field: 'role', headerName: 'Role', width: 150 },
        { field: 'skills', headerName: 'Skills', width: 200 },
        { field: 'achievements', headerName: 'Achievements', width: 200 },
        { field: 'experience', headerName: 'Experience', width: 150 },
        { field: 'resume', headerName: 'Resume', width: 150, renderCell: (params) => params.value ? 'Uploaded' : 'Not Uploaded' },
    ];
    
    const rows = data.map((item, index) => ({
        id: index + 1, 
        firstName: item.personalData.firstName,
        lastName: item.personalData.lastName,
        phone: item.personalData.phone,
        address: item.personalData.address,
        dateOfBirth: item.personalData.dateOfBirth,
        college: item.educationData.education.college,
        grade: item.educationData.education.grade,
        passingYear: item.educationData.education.passingYear,
        branch: item.educationData.education.branch,
        intermediateInstitute: item.educationData.intermediate.institute,
        intermediateStream: item.educationData.intermediate.stream,
        intermediateGrade: item.educationData.intermediate.grade,
        intermediateYear: item.educationData.intermediate.passedYear,
        schoolName: item.educationData.school.schoolName,
        schoolGrade: item.educationData.school.grade,
        schoolYear: item.educationData.school.passedYear,
        role: item.professionalData.role,
        skills: item.professionalData.skills.join(','),
        achievements: item.professionalData.achievements,
        experience: item.professionalData.experience,
        resume: item.professionalData.resume,
    }));
    

    return (
        <Container sx={{ marginTop: 2, flexWrap: "wrap" }}>

            {/* DataGrid Section */}
            <Box sx={{ height: '80vh', width: '100%', marginTop: 2 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        </Container>
    );
};

export default UserContent;