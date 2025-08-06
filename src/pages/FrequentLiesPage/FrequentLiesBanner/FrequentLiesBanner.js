import './FrequentLiesBanner.scss'
import background from './images/lies-grid.jpg'
export default function FrequentLiesBanner(){
    return(
        <div className='lies-banner'>
            <img className='bg' src={background} alt="frequent lies grid"></img>
            <div className='banner-titles'>
                <h1>ЧЕСТО СРЕЩАНИ ЛЪЖИ В БЪЛГАРСКИТЕ МЕДИИ</h1>
                <h2>Разобличаваме дезинформацията, която подкопава демокрацията, подменя истината и забавя изграждането на гражданското общество.</h2>
            </div>
        </div>
    )
}