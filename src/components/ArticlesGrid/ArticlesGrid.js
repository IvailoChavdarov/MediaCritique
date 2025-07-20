import './ArticlesGrid.scss'
import { Link } from "react-router";
import { FaReadme } from "react-icons/fa";
import { transliterate } from "../../utils/transliterate";
import { slugify } from "../../utils/slugify";
import { scrollToTop } from "../../utils/scrollToTop";
export default function ArticlesGrid({articles, category}){
    return(
        <div className='articles-container'>
            <section className="articles-grid">
                    {
                    articles.map((article, i)=>(
                        <div className="article" key={i}>
                            <img src={article.imageUrl} alt="article-image"/>
                            <h3>{article.title}</h3>
                            <p className='article-catch'>{article.catch}</p>
                            <Link to={`/${category}/${article.id}-${slugify(transliterate(article.title))}`} className='call-to-action-button' onClick={scrollToTop}>
                                <FaReadme/>
                                 Прочети
                            </Link>
                            {article.date && <p className='article-date'>{article.date}</p>}
                        </div>
                    ))}
            </section>  
        </div>
    )
}