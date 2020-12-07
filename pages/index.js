import Content from '../components/Content';
import FilterModal from '../components/FilterModal';
import Footer from '../components/Footer';
import Header from '../components/Header'
import SearchInput from '../components/SearchInput';
import Sidebar from '../components/Sidebar';
import Head from 'next/head'

export default function Home(){
    return (
        <div className="lg:conatiner mx-auto flex flex-col h-auto justify-between px-5 bg-gray-100">
            <Head>
                <title>Health Explore</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header /><FilterModal />
            <SearchInput />
            <div className="flex mt-auto flex-grow text-gray-600 text-sm leading-8">
                <Sidebar />
                <Content />
            </div>
            <Footer />
        </div>
    );
}