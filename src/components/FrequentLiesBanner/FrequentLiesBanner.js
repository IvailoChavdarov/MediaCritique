import './FrequentLiesBanner.scss'
import brics from './images/brics.jpg'
import covid from './images/covid.jpg'
import eu from './images/eu.jpg'
import euro from './images/euro.jpg'
import nato from './images/nato.jpg'
import putin from './images/putin.jpg'
import shengen from './images/shengen.jpg'
import zhivkov from './images/zhivkov.jpg'
export default function FrequentLiesBanner(){
    return(
        <div className='lies-banner'>
            <div className="banner-background">
                <div className='div-1'>
                    <img src={brics} alt='BRICS'/>
                </div>
                <div className='div-2'>
                    <img src={euro} alt='Euro'/>
                </div>
                <div className='div-3'>
                    <img src={zhivkov} alt='Todor Zhivkov'/>
                </div>
                <div className='div-4'>
                    <img src={covid} alt='Covid-19'/>
                </div>
                <div className='div-5'>
                    <img src={putin} alt='Russia'/>
                </div>
                <div className='div-6'>
                    <img src={nato} alt='NATO'/>
                </div>
                <div className='div-7'>
                    <img src={eu} alt='European/Soviet Union'/>
                </div>
                <div className='div-8'>
                    <img src={shengen} alt='Shengen'/>
                </div>
            </div>
            <div className='banner-titles'>
                <h1>ЧЕСТО СРЕЩАНИ ЛЪЖИ В БЪЛГАРСКИТЕ МЕДИИ</h1>
                <h2>Разобличаваме дезинформацията, която подкопава демокрацията, подменя истината и руши доверието в институциите.</h2>
            </div>
        </div>
    )
}