import Link from "next/link";
import Head from "next/head";

export default ({children, title = 'Test rest api'}) => (
    <div>
        <Head>
            <title>{ title } | rest api</title>
            <meta charSet='utf-8'/>
            <meta httpEquiv='X-UA-Compatible' content='IE=edge'/>
            <meta name='viewport' content='width=device-width, initial-scale=1'/>
            <meta name='defaultLanguage' content='fr'/>
            <meta name='availableLanguages' content='fr, en'/>
            <link rel="stylesheet"
                  href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css"/>
            <link rel="stylesheet" href="/static/styles.css"/>
        </Head>
        <nav className="navbar navbar-default">
            <div className="container-fluid">

                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"/>
                        <span className="icon-bar"/>
                        <span className="icon-bar"/>
                    </button>
                    <Link href='/'>
                        <a className="navbar-brand" href="#">Test next.js + rest api</a>
                    </Link>
                </div>


                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                        <li>
                            <Link href='/create'>
                                <a href="#">Create new user</a>
                            </Link>
                        </li>
                        <li><a href="#" target="_blank">See on github <img src="/static/images/github.png"/> </a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <div className="container">
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    { children }
                </div>
            </div>
        </div>
        <div className='container'>
            <footer className='footer text-center'>
                &copy; 2017 - Paveluc Veaceslav
            </footer>
        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
    </div>
);