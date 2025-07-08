import React from 'react';
import PropTypes from 'prop-types';
import Zalo from "../../images/zalo.png"
import FB from "../../images/fb.jpg"
import "./styleFooter.scss"

Footer.propTypes = {
    
};

function Footer(props) {
    return (
        <div>
            <footer>
            <div class="foot">
                    <div class="thongtin">
                        <h3>thông tin công ty</h3>
                        <i class='bx bx-map'></i>    
                        <span>CÔNG TY TNHH THUÊ XE SÀI GÒN - MST: 0314086819</span>
                        <br/>
                        <i class='bx bx-phone-call'></i>
                        <span>Hotline:0396603412</span>
                        <br/>
                        <i class='bx bx-mail-send'></i>
                        <span>Email: nhatnguyenhong45@gmail.com</span>
                        <br/>
                        <a href=""><img src={Zalo} alt=""/> </a>
                        <a href=""><img src={FB} alt="" /> </a>
                    </div>
                    <div class="map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2711.1279609890457!2d108.16669645847703!3d16.05957654047907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219185d37cb4f%3A0xd208a2b0e6bc4d2d!2zODAgVMO0IEhp4buHdSwgSG_DoCBNaW5oLCBMacOqbiBDaGnhu4N1LCDEkMOgIE7hurVuZyA1NTAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1719339514473!5m2!1svi!2s"
                        style={{ width:"600", height:"450", border:"0"}} allowfullscreen="" loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"   title="Google Map"></iframe>
                    </div>
            </div>
                <div class="end">
                    <p>Copyright © 2018 CÔNG TY TNHH THUÊ XE SÀI GÒN. Design by Nina.vn</p>
                </div>
        </footer>
        </div>
    );
}

export default Footer;