import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import SearchResult from "./components/SearchResult";
import store from "./Store.jsx";
import Tabs, { TabType } from "./components/Tabs.jsx";

function App () {
    const [searchKeyword, setSearchKeyword] = useState("")
    const [searchResult, setsearchResult] = useState([])
    const [submitted, setsubmitted] = useState(false)
    const [selectedTab, setSelectedTab] = useState(TabType.KEYWORD)

    useEffect(() => {
        console.log(searchKeyword);
    }, [searchKeyword])

    const handleChangeInput = (searchKeyword) => {

        if (searchKeyword.length <= 0) {
            handleReset()
        }
        setSearchKeyword(searchKeyword)
    }

    const search = (searchKeyword) => {
        const searchResult = store.search(searchKeyword)

        setsearchResult(searchResult)
        setsubmitted(true)
    }

    const handleReset = () => {
        setSearchKeyword("")
        setsearchResult([])
        setsubmitted(false)
    }

    return (
        <>
            <Header title="검색"/>
            <div className="container">
                <SearchForm
                    value={searchKeyword}
                    onChange={(value) => handleChangeInput(value)}
                    onSubmit={(searchKeyword) => search(searchKeyword)}
                    onReset={() => handleReset()}
                />

                <div className="content">
                    {submitted ? 
                        <SearchResult data={searchResult}/>
                         : 
                        <Tabs
                            selectedTab={selectedTab}
                            onChange={(selectedTab) => setSelectedTab(selectedTab)}
                        />
                    }
                    {selectedTab === TabType.KEYWORD && <>TODO: 추천검색어 목록</>}
                    {selectedTab === TabType.HISTORY && <>TODO: 최근검색어 목록</>}
                </div>

            </div>
        </>
    )
}

export default App