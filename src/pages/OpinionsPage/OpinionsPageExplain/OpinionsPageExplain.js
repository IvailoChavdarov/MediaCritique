import warnSVG from './images/warn.svg'
import thoughtSVG from './images/thought.svg'
import { ReactSVG } from 'react-svg';
import './OpinionsPageExplain.scss'

export default function OpinionsPageExplain(){
    return(
        <div className='page-explain'>
            <h2 className='page-explain-heading'>Относно нашето мнение...</h2>
            <h3 className='page-explain-subheading'>Какво да имате предвид, когато четете нашите статии.</h3>
            <div className='explain-row'>
                <div className='explain-image'>
                    <ReactSVG src={thoughtSVG}/>
                </div>
                <div className='explain-info'>
                    <h3>
                        Тази страница
                    </h3>
                    <p>
                        Тук екипът ни споделя своите анализи, аргументи и лични гледни точки по ключови въпроси. 
                        Разглеждаме различни проблеми в медиите, политически игри, обществени дискусии, международни въпроси, скандали и напрежения, както и лични впечатления за нещата, случващи се в България, както и по света.
                    </p>
                </div>
            </div>
            <div className='explain-row page-explain-warning'>
                <div className='explain-info'>
                    <h3>
                        Предупреждение
                    </h3>
                    <p>
                        Това са лични мнения – не професионални анализи.
                         Може да сме предубедени, може да пропускаме контекст, може просто да грешим. 
                         Затова не приемайте нищо тук за чиста монета: проверявайте източниците, четете повече по темата и спорете с нас.
                          Истината се ражда в дискусията, а не в едностранчиви текстове.
                    </p>
                </div>
                <div className='explain-image'>
                    <ReactSVG src={warnSVG} className='warn-image'/>
                </div>
            </div>
        </div>
    )
}