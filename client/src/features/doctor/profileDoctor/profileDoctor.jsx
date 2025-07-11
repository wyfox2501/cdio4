import React, { useState } from "react";
import "./profileDoctor.scss";

function ProfileDoctor() {
  const [formData, setFormData] = useState({
    name: "Lê Minh Hoàng",
    birthDate: "26/09/2004",
    phone: "0903025412",
    email: "leminhhoang2314@gmail.com",
    education: "Bác sĩ đa khoa",
    gender: "Nam",
    address: "26 Lê Lợi, Đà Nẵng",
  });

  const [isEditing, setIsEditing] = useState(false);

  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const handleSave = () => {
    console.log("Updated data:", formData);
    setIsEditing(false);
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

  const handleSavePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      alert("Mật khẩu mới không khớp!");
      return;
    }
    console.log("Password changed:", passwordData);
    setIsChangingPassword(false);
  };

  return (
    <div className="profile-customer">
      <div className="profile-card">
        {!isChangingPassword && (
          <>
            <h2 className="profile-title">THÔNG TIN VỀ BÁC SĨ</h2>
            <div className="profile-content">
              <div className="profile-left">
                <img src="" alt="Avatar" className="profile-avatar" />
                <button className="avatar-button">Thay đổi Avatar</button>
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

                <div className="label">Học vấn:</div>
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                    />
                  ) : (
                    <div className="text">{formData.education}</div>
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
                />
              </div>
              <div className="form-group">
                <label>Mật khẩu mới:</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="form-group">
                <label>Nhập lại mật khẩu mới:</label>
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={passwordData.confirmNewPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="edit-actions">
                <button className="btn btn-green" onClick={handleSavePassword}>
                  Cập nhật
                </button>
                <button
                  className="btn btn-red"
                  onClick={handleCancelChangePassword}
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

export default ProfileDoctor;
