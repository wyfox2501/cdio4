import React from 'react';
import PropTypes from 'prop-types';
import './styleCancel.scss'
import { useState } from 'react';
CancelList.propTypes = {
    dataCancel: PropTypes.array
};
CancelList.defaultProps={
    dataCancel: [],
};

function CancelList({dataCancel}) {
        const [data,setData]=useState({
            ngay:"",
            thoigian:"",
            lydo:"",
            khachhang:"",
            sdt:"",
            trieuchung:"",

        })
        const [meseger, setMeseger]=useState('')
        // const [errors,setErrors]=useState({})
        const [color, setColor]=useState('#f03242')
        const setinput=(e)=>{
            const { name, value } = e.target;

        const newData = {
            ...data,
            [name]: value
        };
        setData(newData);
            if((name==='ngay' || name==='thoigian') && (newData.ngay && newData.thoigian)&& Array.isArray(dataCancel)){
                const match=dataCancel.find(pre=>
                    pre.date===newData.ngay && String(pre.hour)===String(newData.thoigian)
                )
  
            if(match){
              newData.khachhang=match.name || "không có dữ liệu"
              newData.sdt=match.sdt || "không có dữ liệu"
              newData.trieuchung=match.symptum || "không có dữ liệu"
            }else {
                    newData.khachhang= "";
                    newData.sdt="";
                    newData.trieuchung= "";
            }
            setData(newData);
        };

        // setErrors({
        //     ...errors,
        //     [e.target.name]: '',
        // })
    };
        const check_input=(e)=>{
            e.preventDefault();
            const newErorrs={};
            if(!data.ngay.trim())
                newErorrs.ngay='vui lòng nhập ngày'
            if(!data.thoigian.trim()){
            newErorrs.thoigian='vui lòng nhập thời gian'
            } else if (isNaN(data.thoigian) || data.thoigian < 7 || data.thoigian > 21) {
            newErorrs.thoigian = "Giờ bắt đầu không hợp lệ (7 - 21)";
        }
               
            if(!data.lydo.trim())
                newErorrs.lydo='vui lòng nhập lý do'
            if(!data.khachhang.trim())
                 newErorrs.khachhang='vui lòng nhập khách hàng'
            if(!data.sdt.trim())
                 newErorrs.sdt='vui lòng nhập sdt'
            if(!data.trieuchung.trim())
                 newErorrs.trieuchung='vui lòng nhập triệu chứng'
            if(Object.keys(newErorrs).length>0){
                // setErrors(newErorrs);
                setMeseger("lỗi")
            }else{
                // setErrors({});
                setMeseger("Lưu Thành Công")
                setColor(!color?"#f03242":"green")
            }
            //chạy 5s sẽ tắt là load trang
            setTimeout(() => {
                setMeseger('');
                window.location.reload(); // 🔁 reload lại trang
              }, 5000);
        }
    return (
        <div className='add'>
             {
                    meseger &&(
                        <p style={{backgroundColor:color, color:"white"}}>
                        {meseger}</p>
                    )
                }
              <form action="" onSubmit={check_input}>
                <h2>Hủy lịch</h2>
               <div className="insert">
                    <div className="date">
                 
                        <span> Ngày</span>
                        <input  type="date" name="ngay" id="input1"  onChange={setinput}/>
                    </div>
                    <div className="hour">
                        <span>Thời Gian</span>
                        <input type="number" name="thoigian" id="input" min={'7'} max={'21'}  placeholder='7H' onChange={setinput}/>
                    </div>
                    <div className="khachhang">
                        <span>Khách Hàng</span>
                        <input type="text" name="khachhang" id="input2" value={data.khachhang} onChange={setinput} readOnly/>
                    </div>
                    <div className="sdt">
                        <span>SDT</span>
                        <input type="number" name="sdt" id="input2" value={data.sdt}  onChange={setinput} readOnly/>
                    </div>
                
                    <div className="trieuChung">
                        <span>Triệu Chứng</span>
                        <input type="text" name="trieuchung" id="input2" value={data.trieuchung} onChange={setinput} readOnly/>
                    </div>
                    <div className="lyDo">
                        <span>Lý do</span>
                        <input type="text" name="lydo" id="input" placeholder='cảm, sốt'  onChange={setinput}/>
                    </div>
               </div>
                <button type='submit'>Lưu</button>
              
            </form>
        </div>
    );
}

export default CancelList;