import React, { useEffect, useState } from 'react';
import './home.scss';

import banner1 from '../../images/banner1.jpg';
import banner2 from '../../images/banner2.jpg';
import banner3 from '../../images/banner3.jpg';
import doctorImg from '../../images/2002.jpg';
function Home() {
    const slides = [
        {
            image: banner1,
            caption: 'Uy Tín',
        },
        {
            image: banner2,
            caption: 'Chất Lượng',
        },
        {
            image: banner3,
            caption: 'Giá Cả Hợp Lý',
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === slides.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <>
            <div className="banner-slider">
                {slides.map((slide, index) => (
                    <div
                        className={`slide ${index === currentIndex ? 'active' : ''}`}
                        key={index}
                    >
                        <img src={slide.image} alt={`Slide ${index + 1}`} />
                        <div className="overlay">{slide.caption}</div>
                    </div>
                ))}

                <div className="controls">
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => handleDotClick(index)}
                        ></div>
                    ))}
                </div>
            </div>

            <div className="GioiThieu">
                <h2>Bác sĩ và bệnh nhân gần nhau hơn chỉ với một nền tảng</h2>


                <div className='tong'>
                    <div className='left'>
                        <img src={doctorImg} alt="..." className='img' />
                    </div>
                    <div className='right'>
                        <p>
                            Nền tảng của chúng tôi đóng vai trò như cầu nối đáng tin cậy giữa bác sĩ và người khám bệnh,
                            giúp đơn giản hóa quy trình đặt lịch, tư vấn và theo dõi sức khỏe. Với giao diện thân thiện,
                            thao tác dễ dàng và hệ thống hỗ trợ 24/7, người dùng có thể nhanh chóng kết nối với đội ngũ y tế
                            chuyên nghiệp mọi lúc, mọi nơi. Chúng tôi cam kết mang đến trải nghiệm chăm sóc sức khỏe hiện đại,
                            an toàn và hiệu quả cho mọi đối tượng.
                        </p>
                    </div>
                </div>
            </div>

            <div className="DichVu">
                <h2>Dịch Vụ</h2>
                <div className="tong2">
                    <p>
                        Nền tảng của chúng tôi cung cấp giải pháp kết nối trực tiếp giữa <strong>bệnh nhân</strong> và <strong>bác sĩ</strong>,
                        giúp việc chăm sóc sức khỏe trở nên dễ dàng, nhanh chóng và hiệu quả hơn bao giờ hết.
                    </p>
                    <ul>
                        <li> Đặt lịch khám trực tuyến với bác sĩ chuyên khoa</li>
                        <li> Tư vấn sức khỏe từ xa qua video hoặc tin nhắn</li>
                        <li> Quản lý hồ sơ bệnh án điện tử an toàn và bảo mật</li>
                        <li> Nhận đơn thuốc và hướng dẫn điều trị trực tuyến</li>
                        <li> Cập nhật thông tin sức khỏe cá nhân mọi lúc, mọi nơi</li>
                    </ul>
                    <p>
                        Chúng tôi cam kết mang lại trải nghiệm chăm sóc y tế hiện đại, thuận tiện và phù hợp với nhu cầu của từng người dùng.
                    </p>
                </div>
            </div>

        </>
    );
}

export default Home;
