import instagram from '@assets/instagram.png'
import facebook from '@assets/facebook.png'
import whatsapp from '@assets/whatsapp.png'

/**
 * Pie de página con mensaje y redes sociales
 * @method Footer
 * @return {JSX.Element}
 */
const Footer = () => (
  <footer>
    <h4>
      Hecho con mucho amor para que cada mascota encuentre su hogar ideal. Cada patita merece su
      hogar, gracias por ser parte de esta comunidad. Adoptar es un acto de amor que le da una
      segunda oportunidad a todos los peluditos
    </h4>
    <div className="botonesapps-posicion">
      <button type="button" className="botonesapps">
        <img src={instagram} alt="Instagram" className="img" />
      </button>
      <button type="button" className="botonesapps">
        <img src={facebook} alt="Facebook" className="img" />
      </button>
      <button type="button" className="botonesapps">
        <img src={whatsapp} alt="WhatsApp" className="img" />
      </button>
    </div>
    <p className="copy">© 2026, Patitas · Hecho con amor desde Argentina</p>
  </footer>
)

export default Footer