import React, { useState } from "react";
import  '../UI/create-profile-form.css';

const CreateProfileForm = (props) => {
    
    const [selectFile,setSelectedFile] = useState();

    const onSubmitHandler = (event)=>{
        event.preventDefault();
        console.log(document.getElementById('profileName').value);
        console.log(document.getElementById('file').value);
        
        var bodyFormData = new FormData();
        bodyFormData.append('profileName', document.getElementById('profileName').value);
        bodyFormData.append('file',selectFile);
        const requestOptions = {
            mode: 'no-cors',
            method: "POST",
            // headers: { "Content-Type": "multipart/form-data",
            // "Accept": "application/json",
            // "type": "formData",
            // "boundary":1 },
            body: bodyFormData,
          };
        fetch(
            "http://localhost:8080/form-filling/profile/add",
            requestOptions
          ).then((response) => console.log(response.body)).then(()=> {
            props.onProfileSubmit();
          })
    }

    const fileCHangeHandler = (event) =>{
        setSelectedFile(event.target.files[0]);
    }
    return (
        <div className="create-profile-form-div">
            <div className="create-form">
            <form   onSubmit={onSubmitHandler}>
                <label>Enter Profile Name</label><br/>
                <input className="profile-name" type="text" name="profileName" id="profileName"/><br/>

                <label>Upload File</label><br/>
                <input className="file" type="file" name="file" id="file" onChange={fileCHangeHandler}/><br/>

                <button type="submit">Submit</button>                                                    
            </form>
            </div>
        </div>
    )
}

export default CreateProfileForm;