CREATE TABLE Users (
    User_id UUID PRIMARY KEY,
    UserName VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Password TEXT NOT NULL,
    Avata TEXT,
    Role VARCHAR(50), -- 'doctor' | 'patient' | etc.
    Active BOOLEAN DEFAULT TRUE,
    CreateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE Doctor (
    User_id UUID PRIMARY KEY REFERENCES Users(User_id) ON DELETE CASCADE,
    Specification TEXT,
    Image_Certification TEXT,
    Experience INTEGER
);
CREATE TABLE Patient (
    User_id UUID PRIMARY KEY REFERENCES Users(User_id) ON DELETE CASCADE,
    Height NUMERIC,
    Weight NUMERIC,
    BMI NUMERIC,
    Year_Old INTEGER,
    Genre VARCHAR(10)
);
CREATE TABLE Wallet (
    Wallet_id UUID PRIMARY KEY REFERENCES Doctor(User_id) ON DELETE CASCADE,
    Total_Money NUMERIC DEFAULT 0,
    CreateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE Bill (
    Bill_id UUID PRIMARY KEY,
    Wallet_id UUID REFERENCES Wallet(Wallet_id) ON DELETE CASCADE,
    Balance_Fluctuation NUMERIC,
    Transaction_Type VARCHAR(50), -- e.g. 'topup', 'withdrawal'
    CreateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE DoctorSchedule (
    Schedule_id UUID PRIMARY KEY,
    User_id UUID REFERENCES Doctor(User_id) ON DELETE CASCADE,
    Date DATE,
    Datetime_Start TIMESTAMP,
    Datetime_End TIMESTAMP
);
CREATE TABLE Appointments (
    Appointment_id UUID PRIMARY KEY,
    Doctor_id UUID REFERENCES Doctor(User_id) ON DELETE CASCADE,
    Patient_id UUID REFERENCES Patient(User_id) ON DELETE CASCADE,
    Appointment_Date DATE,
    Time TIME,
    Status VARCHAR(50)
);