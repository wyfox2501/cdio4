import React, { useState, useEffect } from "react";
import "./ProfileCustomer.scss";

function ProfileCustomer() {
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    phone: "",
    email: "",
    gender: "",
    address: "",
    height: "",
    weight: "",
    bmi: "",
    avata: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Fetch user data when component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Get basic user info
      const userResponse = await fetch("http://localhost:5000/api/profile", {
        method: "GET",
        credentials: "include",
      });
      
      if (!userResponse.ok) {
        throw new Error("Failed to fetch user data");
      }
      
      const userData = await userResponse.json();
      
      // Get patient-specific details
      const patientResponse = await fetch("http://localhost:5000/api/patient", {
        method: "GET", 
        credentials: "include",
      });
      
      let patientData = null;
      if (patientResponse.ok) {
        const patientResult = await patientResponse.json();
        patientData = patientResult[0]; // API returns array
      }
      
      // Format the data
      setFormData({
        name: userData.user?.username || "",
        birthDate: userData.user?.birthdate ? new Date(userData.user.birthdate).toLocaleDateString('vi-VN') : "",
        phone: userData.user?.phone || "",
        email: userData.user?.email || "",
        gender: userData.user?.sex === true ? "Nam" : userData.user?.sex === false ? "Nữ" : "",
        address: userData.user?.address || "",
        height: patientData?.height?.toString() || "",
        weight: patientData?.weight?.toString() || "",
        bmi: patientData?.bmi?.toString() || "",
        avata: userData.user?.avata || ""
      });
      
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Không thể tải thông tin người dùng");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: value,
      };

      // Calculate BMI if both height and weight are present
      if ((name === 'height' || name === 'weight') && newData.height && newData.weight) {
        const heightInMeters = parseFloat(newData.height) / 100;
        const weightInKg = parseFloat(newData.weight);
        if (heightInMeters > 0 && weightInKg > 0) {
          newData.bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
        }
      }

      return newData;
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenderChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      gender: e.target.value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avata', file);

    try {
      const response = await fetch('http://localhost:5000/api/avatar', {
        method: 'PUT',
        credentials: 'include',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to update avatar');
      }

      // Refresh user data to get new avatar
      await fetchUserData();
      alert('Avatar đã được cập nhật thành công!');
    } catch (err) {
      console.error('Error updating avatar:', err);
      alert('Có lỗi xảy ra khi cập nhật avatar');
    }
  };

  const handleSave = async () => {
    try {
      // Format the date to YYYY-MM-DD
      const dateParts = formData.birthDate.split('/');
      const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

      // Update basic user info
      const userResponse = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        credentials: 'include',
        body: new URLSearchParams({
          username: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          sex: formData.gender==='Nam' ? true : formData.gender==='Nữ' ? false : null,
          birthdate: formattedDate
        }).toString()
      });

      if (!userResponse.ok) {
        const errorData = await userResponse.json();
        throw new Error(errorData.message || 'Failed to update user data');
      }

      // Update patient-specific data (height, weight, BMI)
      const patientResponse = await fetch('http://localhost:5000/api/patient', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        credentials: 'include',
        body: new URLSearchParams({
          height: formData.height || "0",
          weight: formData.weight || "0",
          bmi: formData.bmi || "0"
        }).toString()
      });
      
      if (!patientResponse.ok) {
        const errorData = await patientResponse.json();
        throw new Error(errorData.message || 'Failed to update patient data');
      }
      
      alert('Cập nhật thông tin thành công!');
      setIsEditing(false);
      
      // Refresh data
      await fetchUserData();
      
    } catch (err) {
      console.error('Error updating user data:', err);
      alert('Có lỗi xảy ra khi cập nhật thông tin: ' + err.message);
    }
  };

  const handleChangePassword = () => {
    setIsChangingPassword(true);
  };

  const handleCancelChangePassword = () => {
    setIsChangingPassword(false);
    setPasswordData({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  const handleSavePassword = async () => {
    try {
      // Validate passwords
      if (passwordData.newPassword !== passwordData.confirmNewPassword) {
        alert("Mật khẩu mới không khớp!");
        return;
      }

      if (!passwordData.oldPassword || !passwordData.newPassword) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
      }

      if (passwordData.newPassword.length < 6) {
        alert("Mật khẩu mới phải có ít nhất 6 ký tự!");
        return;
      }

      setIsPasswordLoading(true);

      // Create FormData object
      const formData = new FormData();
      formData.append('oldPassword', passwordData.oldPassword);
      formData.append('newPassword', passwordData.newPassword);

      console.log('Sending password change request...');

      // Call API to change password
      const response = await fetch('http://localhost:5000/api/change_password', {
        method: 'PUT',
        credentials: 'include',
        body: formData
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to change password');
      }

      const data = await response.json();
      console.log('Password change response:', data);

      alert(data.message);
      
      // Only close the password form after successful update
      setIsChangingPassword(false);
      
      // Reset password form
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (err) {
      console.error('Error changing password:', err);
      alert(err.message || 'Có lỗi xảy ra khi đổi mật khẩu');
    } finally {
      setIsPasswordLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-customer">
        <div className="profile-card">
          <div className="loading">Đang tải thông tin...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-customer">
        <div className="profile-card">
          <div className="error">{error}</div>
          <button onClick={fetchUserData}>Thử lại</button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-customer">
      <div className="profile-card">
        {!isChangingPassword && (
          <>
            <h2 className="profile-title">THÔNG TIN CÁ NHÂN</h2>
            <div className="profile-content">
              <div className="profile-left">
                <img 
                  src={`http://localhost:5000/images/${formData.avata || 'avatar.webp'}`} 
                  alt="Avatar" 
                  className="profile-avatar" 
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: 'none' }}
                  id="avatar-input"
                />
                <button className="avatar-button" onClick={() => document.getElementById('avatar-input').click()}>
                  Thay đổi Avatar
                </button>
                {!isEditing && (
                  <button className="action-button" onClick={handleEdit}>
                    <span>✏️</span> <span>Chỉnh sửa thông tin</span>
                  </button>
                )}
                <button
                  className="action-button"
                  onClick={handleChangePassword}
                >
                  <span>🔒</span> <span>Chỉnh sửa mật khẩu</span>
                </button>
              </div>

              <div className="profile-right">
                <div className="label">Họ và Tên:</div>
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  ) : (
                    <div className="text">{formData.name}</div>
                  )}
                </div>

                <div className="label">Ngày Sinh:</div>
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleChange}
                    />
                  ) : (
                    <div className="text">{formData.birthDate}</div>
                  )}
                </div>

                <div className="label">Điện Thoại:</div>
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  ) : (
                    <div className="text">{formData.phone}</div>
                  )}
                </div>

                <div className="label">Email:</div>
                <div>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  ) : (
                    <div className="text">{formData.email}</div>
                  )}
                </div>

                <div className="label">Giới Tính:</div>
                <div>
                  {isEditing ? (
                    <>
                      <label className="gender">
                        <input
                          type="radio"
                          name="gender"
                          value="Nam"
                          checked={formData.gender === "Nam"}
                          onChange={handleGenderChange}
                        />
                        Nam 
                      </label>
                      <label className="gender">
                        <input
                          type="radio"
                          name="gender"
                          value="Nữ"
                          checked={formData.gender === "Nữ"}
                          onChange={handleGenderChange}
                        />
                        Nữ
                      </label>
                    </>
                  ) : (
                    <div className="text">{formData.gender}</div>
                  )}
                </div>

                <div className="label">Địa Chỉ:</div>
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  ) : (
                    <div className="text">{formData.address}</div>
                  )}
                </div>

                <div className="label">Chiều cao (cm):</div>
                <div>
                  {isEditing ? (
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      placeholder="Nhập chiều cao"
                    />
                  ) : (
                    <div className="text">{formData.height || "Chưa cập nhật"}</div>
                  )}
                </div>

                <div className="label">Cân nặng (kg):</div>
                <div>
                  {isEditing ? (
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder="Nhập cân nặng"
                    />
                  ) : (
                    <div className="text">{formData.weight || "Chưa cập nhật"}</div>
                  )}
                </div>

                <div className="label">BMI:</div>
                <div>
                  {isEditing ? (
                    <input
                      type="number"
                      step="0.1"
                      name="bmi"
                      value={formData.bmi}
                      onChange={handleChange}
                      placeholder="Nhập chỉ số BMI"
                      disabled
                    />
                  ) : (
                    <div className="text">{formData.bmi || "Chưa cập nhật"}</div>
                  )}
                </div>

                <div className="label">Vai Trò:</div>
                <div className="text">Khách Hàng</div>
              </div>
            </div>

            {isEditing && (
              <div className="edit-actions">
                <button className="btn btn-green" onClick={handleSave}>
                  Cập nhật
                </button>
                <button className="btn btn-red" onClick={handleCancelEdit}>
                  Hủy
                </button>
              </div>
            )}
          </>
        )}

        {isChangingPassword && (
          <>
            <h2 className="profile-title">🔑 THAY ĐỔI MẬT KHẨU</h2>
            <div className="password-form">
              <div className="form-group">
                <label>Mật khẩu cũ:</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                  disabled={isPasswordLoading}
                />
              </div>
              <div className="form-group">
                <label>Mật khẩu mới:</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  disabled={isPasswordLoading}
                />
              </div>
              <div className="form-group">
                <label>Nhập lại mật khẩu mới:</label>
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={passwordData.confirmNewPassword}
                  onChange={handlePasswordChange}
                  disabled={isPasswordLoading}
                />
              </div>
              <div className="edit-actions">
                <button 
                  className="btn btn-green" 
                  onClick={handleSavePassword}
                  disabled={isPasswordLoading}
                >
                  {isPasswordLoading ? 'Đang cập nhật...' : 'Cập nhật'}
                </button>
                <button
                  className="btn btn-red"
                  onClick={handleCancelChangePassword}
                  disabled={isPasswordLoading}
                >
                  Hủy bỏ
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileCustomer;
