import './FrequentLiesBanner.scss'
import brics from './images/brics.jpg'
import covid from './images/covid.jpg'
import eu from './images/eu.png'
import euro from './images/euro.jpg'
import nato from './images/nato.jpg'
import putin from './images/putin.jpg'
import zhivkov from './images/zhivkov.jpg'
import shengen from './images/shengen.jpg'
import lgbt from './images/lgbt.jpg'
export default function FrequentLiesBanner(){
    return(
        <div className='lies-banner'>
            <div className="banner-background">
                <div>
                    <img src={zhivkov} alt='Todor Zhivkov'/>
                </div>
                <div>
                    <img src={lgbt} alt='LGBT'/>
                </div>
                <div>
                    <img src={covid} alt='Covid-19'/>
                </div>
                <div>

                    <img src={eu} alt='European/Soviet Union'/>
                </div>
                <div>
                    <img src={putin} alt='Russia'/>
                </div>
                <div>
                    <img src={nato} alt='NATO'/>
                </div>
                <div>
                    <img src={euro} alt='Euro'/>
                </div>
                <div>
                    <img src={shengen} alt='Shengen'/>
                </div>
                <div>
                    <img src={brics} alt='BRICS'/>
                </div>
            </div>
            <div className='banner-titles'>
                <h1>ЧЕСТО СРЕЩАНИ ЛЪЖИ В БЪЛГАРСКИТЕ МЕДИИ</h1>
                <h2>Разобличаваме дезинформацията, която подкопава демокрацията, подменя истината и забавя изграждането на гражданското общество.</h2>
            </div>
        </div>
    )
}