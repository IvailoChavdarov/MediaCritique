
import './LiesCategories.scss'
import { LuFactory } from "react-icons/lu";
import { GiBaseballBat } from "react-icons/gi";
import { GiDevilMask } from "react-icons/gi";
import { PiChats } from "react-icons/pi";
import { IoNewspaperOutline } from "react-icons/io5";
import { RiSwordLine } from "react-icons/ri";

export default function LiesCategories(){
    return(
        <>
        <div className='lies-categories-heading'>
            <h3>Често срещани оръжия за манипулация</h3>
            <h4>Методите, които редовно се ползват върху обществото, за да предизвикат омраза и апатия.</h4>
        </div>
        <div className='lies-categories-container'>
            <div className='lies-categories'>
                <div className='lie-category'>
                    <div className='lie-category-icon'>
                        <div className='icon-container'>
                            <LuFactory/>
                        </div>
                    </div>
                    <div className='lie-category-explain'>
                        <h4>Трол ферми</h4>
                        <p>
                            В България трол ферми се използват за манипулиране на общественото мнение чрез фалшиви профили в социални мрежи. 
                            Те разпространяват пропаганда, нападат опоненти и заглушават критики. 
                            Обикновено се координират от политически или икономически интереси. Съществуват, защото работят – създават шум, а не истина.
                        </p>
                    </div>
                </div>
                <div className='lie-category'>
                    <div className='lie-category-icon'>
                        <div className='icon-container'>
                            <GiDevilMask/>
                        </div>
                    </div>
                    <div className='lie-category-explain'>
                        <h4>Демонизиране на общества</h4>
                        <p>
                            Медиите често представят цели групи – протестиращи, малцинства или чужденци – като опасни, мързеливи или корумпирани.
                            Това демонизиране цели да раздели обществото и да отклони вниманието от реалните проблеми. 
                            Методът се използва от медии, близки до властта или олигархични кръгове.
                        </p>
                    </div>
                </div>
                <div className='lie-category'>
                    <div className='lie-category-icon'>
                        <div className='icon-container'>
                            <RiSwordLine/>
                        </div>
                    </div>
                    <div className='lie-category-explain'>
                        <h4>Преиначаване на историята</h4>
                        <p>
                            Историята в България често се преразказва според моментните политически нужди – идеите на героите се извръщават, 
                            крие се контекста за техните действия, използва се псевдо патриотизъм за настройване и радикализиране на населението. 
                            Това създава изкуствена памет, която обслужва идеологии, не истината.
                        </p>
                    </div>
                </div>
                <div className='lie-category'>
                    <div className='lie-category-icon'>
                        <div className='icon-container'>
                            <PiChats/>
                        </div>
                    </div>
                    <div className='lie-category-explain'>
                        <h4>Разговори с познати</h4>
                        <p>
                            Манипулацията често се случва през обикновени разговори – хора повтарят фалшиви новини, чули ги от "някой по телевизията". 
                            Така дезинформацията се нормализира, става част от ежедневието. 
                            В България това е мощен канал за влияние, защото доверието в "познатия" е по-силно от това в медиите.
                        </p>
                    </div>
                </div>
                <div className='lie-category'>
                    <div className='lie-category-icon'>
                        <div className='icon-container'>
                            <GiBaseballBat/>
                        </div>
                    </div>
                    <div className='lie-category-explain'>
                        <h4>Медии бухалки</h4>
                        <p>Медии, свързани с икономически или политически интереси, често се използват като "бухалки" – нападат неудобни хора, 
                            водят кампании с клевети и инсинуации. Това не е журналистика, а оръжие. 
                            В България такива медии служат за натиск, разправа и подчинение чрез публичен линч.
                        </p>
                    </div>
                </div>
                <div className='lie-category'>
                    <div className='lie-category-icon'>
                        <div className='icon-container'>
                            <IoNewspaperOutline/>
                        </div>
                    </div>
                    <div className='lie-category-explain'>
                        <h4>Фалшиви заглавия</h4>
                        <p>
                            Заглавия като "СКАНДАЛ! Този политик разкъса...". Често съдържанието няма общо със заглавието,
                            но въпреки това заглавието влияе на хората, дори без да са прочели нататък, често така платени медии 
                            нападат неудобните за тях и се възползват от ниския политически интерес и образование на населението.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}