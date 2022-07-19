import React from "react";
import '../UI/profile-list.css';

const ProfileList = (props) => {

    return(
        <div className="profile-list-main-div">
            <div className="tbl-header">
                <table cellPadding="0" cellSpacing="0" border="0">
                    <thead>
                    <tr>
                        <th>Profile Name</th>
                        <th></th>
                    </tr>
                    </thead>
                </table>
            </div>
            <div className="tbl-content">
                <table>
                    <tbody className="tbl-content">
                        {props.profiles.map((profile)=><tr key={profile.profileId}><td><a href="#" onClick={() => props.visible(profile)}>{profile.profileName}</a></td>
                        <td><button value={profile.profileId} onClick={()=> props.generateFormVisible(profile)}>Generate</button></td></tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProfileList;