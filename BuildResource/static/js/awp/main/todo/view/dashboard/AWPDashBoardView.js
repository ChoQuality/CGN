class AWPDashBoardView {
    constructor(func, loginInfo) {
        this._func = func;
        this._loginInfo = loginInfo;

        this._applicationElement = null
        this._subViewElement = null
        this._contentViewElement = null
        this._todoListElement = null;

        this._slideOpenYn = false;

        this._dashboardSelect1 = null;
        this._dashboardSelect2 = null;
        this._dashboardSelect3 = null;

        this._selectBoxData1 = null;
        this._selectBoxData2 = null;
        this._selectBoxData3 = null;

        this._dashboardSearchType = "ORG";  //  "EMP" : 직원별, "ORG" : 조직별
        this._initSearchOrgCd = null;
        this._searchOrgCd = null;
        this._searchUserKey = null;
        this._searchDate = null;

        this.__categoriesName = null;
        this.__categoriesCD = null;

        this._workFromDt = null;
        this._workToDt = null;
    }

    /***********************************************************************************************************
    * 화면 초기화 설정
    ************************************************************************************************************/
    init(applicationElement){
        this._applicationElement = applicationElement;
        this._todoListElement = this._applicationElement.querySelector('.todoList__body');
//        //그다음 화면 그리는 액션 추가 해주세요.
//        //this.setProgressSituation(null);
//
        todoDashboardApi.getUserInfo(this._loginInfo.userKey)
        .then(response => {
            if(this._loginInfo.orgKey == response.data.orgKey) {
                this._initSearchOrgCd = response.data.orgCd;
            } else {
                if(response.data.pluralJobList.length > 0) {
                    for (const pluralJob of response.data.pluralJobList) {
                       if(this._loginInfo.orgKey == pluralJob.orgKey) {
                           this._initSearchOrgCd = pluralJob.orgCd;
                       }
                    }
                }
            }
        }).then(() => {
            this._searchOrgCd = this._initSearchOrgCd ;
            this._searchDate = new Date();
            this.getDashboardData(this._searchOrgCd, this._searchDate, 0);

            const maxSubOrgDepth = this._func.getSubOrgDepth(this._searchOrgCd);
            if(maxSubOrgDepth < 1) {
                this._applicationElement.querySelector("#_viewDashSelect1").style.width = "0rem";
                this._applicationElement.querySelector("#_viewDashSelect1").style.display = "none";
            }

            if(maxSubOrgDepth < 2) {
                this._applicationElement.querySelector("#_viewDashSelect2").style.width = "0rem";
                this._applicationElement.querySelector("#_viewDashSelect2").style.display = "none";
            }

            if(maxSubOrgDepth < 3) {
                this._applicationElement.querySelector("#_viewDashSelect3").style.width = "0rem";
                this._applicationElement.querySelector("#_viewDashSelect3").style.display = "none";
            }

            this.setSelectBox1(this._searchOrgCd);


        })
        .catch(error => this._func.showToastModal("에러 발생:", error));

        // 왼쪽 버튼 (-1월)
        this._applicationElement.querySelector("#prevMonthBtn").addEventListener('click', () => this.getDashboardData(this._searchOrgCd, this._searchDate, -1));
        // 오른쪽 버튼 (+1월)
        this._applicationElement.querySelector("#nextMonthBtn").addEventListener('click', () => this.getDashboardData(this._searchOrgCd, this._searchDate, 1));

    }

    getComSelectBoxData(orgCd) {
        const __com_selectBox_Data = [{ label: '전체', value: 'all' }];

        if(orgCd == 'all' || orgCd == undefined || orgCd == '') {
            return __com_selectBox_Data;
        } else {
            const __com_OrgCdList = this._func.getSubOrgList(orgCd);
            __com_OrgCdList.forEach(org => {
                __com_selectBox_Data.push({ label: org.text, value: org.orgCd });
            });
            return __com_selectBox_Data;
        }
    }

    setSelectBox1(box1OrgCd) {
        this._selectBoxData1 = this.getComSelectBoxData(box1OrgCd);
        this.setSelectBox3('all'); // [{ label: '전체', value: 'all' }];
        this.setSelectBox2('all'); // [{ label: '전체', value: 'all' }];
        this._dashboardSelect1 = new SelectBox('.dashSelect-1', {
            data: this._selectBoxData1,
        });
        this._dashboardSelect1.on('change', (ev) =>  {
            console.log(" _dashboardSelect1 change : " + ev.prev.getValue() + " => " +  ev.curr.getValue());
            const curVal = ev.curr.getValue();
            if( curVal == 'all') {
                this._searchOrgCd = box1OrgCd;
            } else {
                this._searchOrgCd = curVal;
            }
            this.setSelectBox2(curVal);
            this.setSelectBox3('all');
            this.getDashboardData(this._searchOrgCd, this._searchDate, 0);
        });

        this._dashboardSelect1.on('open', ev=> {
            this._dashboardSelect2.close();
            this._dashboardSelect3.close();
        });
    }

    setSelectBox2(box2OrgCd) {
        if(this._dashboardSelect2 != null) {
            this._dashboardSelect2.destroy();
        }
        this._selectBoxData2 = this.getComSelectBoxData(box2OrgCd);
        this._dashboardSelect2 = new SelectBox('.dashSelect-2', {
            data: this._selectBoxData2,
        });
        this._dashboardSelect2.on('change', (ev) => {
            console.log(" _dashboardSelect2 change : " + ev.prev.getValue() + " => " +  ev.curr.getValue());
            const curVal = ev.curr.getValue();
            if( curVal == 'all') {
                this._searchOrgCd = box2OrgCd;
            } else {
                this._searchOrgCd = curVal;
            }
            this.setSelectBox3(ev.curr.getValue());

            this.getDashboardData(this._searchOrgCd, this._searchDate, 0);
       });
       this._dashboardSelect2.on('open', ev=> {
                       this._dashboardSelect1.close();
                       this._dashboardSelect3.close();
                   });
    }

    setSelectBox3(box3OrgCd) {
        if(this._dashboardSelect3 != null) {
            this._dashboardSelect3.destroy();
        }
        this._selectBoxData3 = this.getComSelectBoxData(box3OrgCd);
        this._dashboardSelect3 = new SelectBox('.dashSelect-3', {
            data: this._selectBoxData3,
        });
        this._dashboardSelect3.on('change', (ev) => {
            console.log(" _dashboardSelect3 change : " + ev.prev.getValue() + " => " +  ev.curr.getValue());
            console.log(" _dashboardSelect3 change : " + ev.prev.getValue() + " => " +  ev.curr.getValue());
            const curVal = ev.curr.getValue();
            if( curVal == 'all') {
                this._searchOrgCd = box3OrgCd;
            } else {
                this._searchOrgCd = curVal;
            }

            this.getDashboardData(this._searchOrgCd, this._searchDate, 0);

       });

       this._dashboardSelect3.on('open', ev=> {
                       this._dashboardSelect1.close();
                       this._dashboardSelect2.close();
                   });
    }

    getDashboardData(orgCd, searchDate, months) {
        searchDate.setMonth(searchDate.getMonth() + months);
        const __year = searchDate.getFullYear();   // 현재 연도 (예: 2025)
        const __month = searchDate.getMonth() + 1; // 현재 월 (0부터 시작하므로 +1 필요)
        const __formattedMonth = String(__month).padStart(2, "0");
        var searchYyyyMm = `${this._searchDate.getFullYear()}${__formattedMonth}`;

        const __com_subOrgList = this._func.getSubOrgList(orgCd);
        if( __com_subOrgList.length == 0) {
            // 팀원별 조회 ( Child 조직이 없는 경우 )
            this._dashboardSearchType = "EMP";  //  "EMP" : 직원별, "ORG" : 조직별
        } else {
            // 조직별 조회 ( Child 조직이 있는 경우 )
            this._dashboardSearchType = "ORG";  //  "EMP" : 직원별, "ORG" : 조직별
        }

        let _searchTodoOption = { "orgCd": orgCd, "searchYyyyMm": searchYyyyMm, "dashboardSearchType" : this._dashboardSearchType };

        this.getTodoProgress(_searchTodoOption);
        this.getWordCloud(_searchTodoOption);

        this._searchDate = searchDate;
        this._applicationElement.querySelector('#searchYyyymm').innerText = `${this._searchDate.getFullYear()}년 ${this._searchDate.getMonth() + 1}월`;
    }

    /***********************************************************************************************************
    * 진행 현황 조회
    ***********************************************************************************************************/
    getTodoProgress = (searchData) => {
        return todoDashboardApi.getTodoProgressData(searchData)
            .then(response => {
                this._workFromDt = response.data.workFromYyyyMmDd;
                this._workToDt = response.data.workToYyyyMmDd;
                this.setProgressSituation(response.data);
                this._applicationElement.querySelector("#detailSearchPeriod").innerText = response.data.workFromYyyyMmDd + "~" + response.data.workToYyyyMmDd;
                this._applicationElement.querySelector("#detailSearchPeriod2").innerText = response.data.workFromYyyyMmDd + "~" + response.data.workToYyyyMmDd;

                // TO-DO 상세 내용 초기화
                this._todoListElement.innerHTML ="";
                this.slideUp(this._applicationElement.querySelector('#todoToggleList'), 100);

                this.setDetailProgressGraph(response.data.detailList);


            })
            .catch(error => this._func.showToastModal("에러 발생:", error));
    }

    /***********************************************************************************************************
    * 진행 현황 화면 설정
    ***********************************************************************************************************/
    setProgressSituation(progressData) {
        this._applicationElement.querySelector('#progress_totalCnt').innerText  = progressData.todoCompleteCnt + progressData.todoOngoingCnt;
        if( ( progressData.todoCompleteCnt + progressData.todoOngoingCnt ) == 0) {
            this._applicationElement.querySelector('#progress_completeRate').innerText  = "0.0%";
        } else {
            let  completeRate = progressData.todoCompleteCnt  / (progressData.todoCompleteCnt + progressData.todoOngoingCnt) * 100;
            this._applicationElement.querySelector('#progress_completeRate').innerText  = completeRate.toFixed(1) + "%";
        }
        this._applicationElement.querySelector('#progress_ongoingCnt').innerText  = progressData.todoOngoingCnt;
        this._applicationElement.querySelector('#progress_completeCnt').innerText  = progressData.todoCompleteCnt;
    }

    /***********************************************************************************************************
    * 세부 진행 현황 화면 설정
    ***********************************************************************************************************/
    setDetailProgressGraph(progressDetailList) {
        const _categories = [];
        const _seriesComplete = [];
        const _seriesOngoing = [];

        this.__categoriesName = [];
        this.__categoriesCD = [];

        if(progressDetailList.length > 0) {
            progressDetailList.forEach((data, idx) => {
                if(this._dashboardSearchType == "EMP") {

                    _categories.push(data.userNm);
                    this.__categoriesName.push(data.userNm);
                    this.__categoriesCD.push(data.userKey);
                } else {

                    _categories.push(data.orgNm);
                    this.__categoriesName.push(data.orgNm);
                    this.__categoriesCD.push(data.orgCd);
                }
                _seriesComplete.push(data.todoCompleteCnt);
                _seriesOngoing.push(data.todoOngoingCnt);
            });
        }

        const columnChartData = {
                    categories: _categories,
                    series: [{
                            name: 'Complete',
                            data: _seriesComplete
                        },
                        {
                            name: 'Ongoing',
                            data: _seriesOngoing
                        }
                    ]
                }

        const columnChartOptions = {
                  chart: {
                      width: columnChartData.categories.length > 15 ? columnChartData.categories.length * 100 : 'auto',
                      height: 360,
                  },
                  xAxis: {
                      label: {
                          margin: 10,
                          rotatable: false
                      },
                  },
                  yAxis: {
                      height: 307,
                      label: {
                          margin: 10
                      },
                      scale: {
                          min: 0,
                          stepSize: 2
                      }
                  },
                  legend: {
                      visible: true,
                      align: 'bottom',
                      showCheckbox: false
                  },
                  exportMenu: {
                      visible: false
                  },
                  series: {
                      selectable: true,
                      eventDetectType: 'grouped',
                      stack: true,
                      dataLabels: {
                          visible: true,
                          formatter: (value) => {
                              if (value == 0)
                                return "";
                              else return value;
                          } ,
                          stackTotal: {
                              formatter: (value) => {
                                  const completeSeries = columnChartData.series.find(series => series.name === 'Complete');
                                  if (!completeSeries) return `${value}`; // Complete 데이터가 없으면 그냥 반환

                                  // 전체 스택 데이터에서 현재 value가 몇 번째 데이터인지 찾아야 함
                                  const totalData = columnChartData.series.reduce((acc, series) => {
                                      return acc.map((sum, i) => sum + (series.data[i] || 0));
                                  }, new Array(columnChartData.categories.length).fill(0));

                                  // `value`가 어느 인덱스에 해당하는지 찾기
                                  const index = totalData.indexOf(value);

                                  if (index === -1) return `${value}`; // 해당 인덱스가 없으면 그대로 반환

                                  const completeValue = completeSeries.data[index] || 0; // Complete 값

                                  // 퍼센트 계산: (Complete / Total) * 100
                                  const percentage = ((completeValue / value) * 100).toFixed(0);

                                  return `${percentage}%`; // 퍼센트 값 반환
                              }
                          },
                      }
                  },
                  theme: {
                      xAxis: {
                          color: '#32363D',
                          label: {
                              fontFamily: 'Pretendard',
                              fontSize: 13,
                              fontWeight: 300,
                              color: '#666666',
                          },
                      },
                      yAxis: {
                          color: 'transparent',
                          label: {
                              fontFamily: 'Pretendard',
                              fontSize: 13,
                              color: '#9EA1AC'
                          },
                      },
                      plot: {
                          vertical: {
                              lineColor: '#ffffff',
                          },
                          horizontal: {
                              lineColor: '#F0EFEF',
                          },
                      },
                      legend: {
                          label: {
                              fontFamily: 'Pretendard',
                              fontSize: 13,
                              color: '#5D646C'
                          }
                      },
                      series: {
                          barWidth: columnChartData.categories.length < 6 ? 120 : 40,
                          colors: ['#2C58CA', '#B5BDCD'],
                          dataLabels: {
                              fontFamily: 'Pretendard',
                              fontSize: 13,
                              color: '#fff',
                              stackTotal: {
                                  fontFamily: 'Pretendard',
                                  fontWeight: 500,
                                  color: '#1F419A',
                                  textBubble: {
                                      visible: false,
                                      paddingY: 6,
                                      borderWidth: 3,
                                      borderColor: '#00bcd4',
                                      borderRadius: 7,
                                      backgroundColor: '#041367',
                                      shadowOffsetX: 0,
                                      shadowOffsetY: 0,
                                      shadowBlur: 0,
                                      shadowColor: 'rgba(0, 0, 0, 0)'
                                  }
                              },
                          },
                          hover: {
                              borderWidth: 0,
                              shadowColor: 'transparent',
                              shadowBlur: 0,
                              groupedRect: {
                                  color: 'transparent',
                                  opacity: 1,
                              }
                          },
                          select: {
                              groupedRect: {
                                  opacity: 0.03
                              },
                              restSeries: {
                                  areaOpacity: 0.1
                              },
                          }
                      }
                  }
              };

        this._applicationElement.querySelector("#detailColumnChart").innerText = '';
        const columnCharts = Chart.columnChart({
                    el: this._applicationElement.querySelector("#detailColumnChart"),
                    data: columnChartData,
                    options: columnChartOptions
                });
        columnCharts.on('selectSeries',(event) => {
            var idx = this.__categoriesName.indexOf(event.column[0].data.category);
            var selectedKey = this.__categoriesCD[idx];
            if(this._dashboardSearchType == "EMP") {
                this.getTodoList(null, selectedKey);
            } else {
                this.getTodoList(selectedKey, null);
            }
        })
    }


    /***********************************************************************************************************
    * TO-DO 상세현황 데이터 조회
    ***********************************************************************************************************/
    getTodoList = (orgCd, userKey) => {
        this._todoListElement.innerHTML ="";
        this.slideUp(this._applicationElement.querySelector('#todoToggleList'), 100);
        console.log(orgCd);
        const searchTodoOption = {
            "orgCd" : orgCd, "userKey" : userKey, "searchYyyyMm" : this._searchDate,
             "workFromDt" : this._workFromDt, "workToDt" : this._workToDt
        }

        return todoDashboardApi.todoListHtml(searchTodoOption)
            .then(htmlString => {

                this._todoListElement.innerHTML = this._func.parseData(htmlString);
                this._todoListElement.querySelectorAll('[name="todoDetailBtn"]').forEach(button => {
                        button.remove(); // 버튼을 화면에서 제거
                    });
                this._todoListElement.querySelectorAll('.confirmBtnGroup').forEach(div => {
                        div.remove(); // 버튼을 화면에서 제거
                    });
            }).then(() => {
                this.slideDown(this._applicationElement.querySelector('#todoToggleList'), 0);
            }).then(() => {
                              this.scrollToTopOfElement(this._applicationElement.querySelector('#todoToggleList'));
                          })
            .catch(error => this._func.showToastModal("에러 발생:", error));
    }

    scrollToTopOfElement = (element) => {
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({ block: "start", behavior: "smooth" });
            }, 100);
        }
    }

    /***********************************************************************************************************
    * 워드 클라이드 데이터 조회
    ***********************************************************************************************************/
    getWordCloud = (searchData) => {

        return todoDashboardApi.getWordCloud(searchData)
            .then(response => {
                this.setWordCloud(response.data);
            })
            .catch(error => this._func.showToastModal("에러 발생:", error));
    }

    /***********************************************************************************************************
    * 워드 클라이드 데이터 설정.
    *      ( 1000 보다 큰 경우 성능상 문제 발생 ,   1000 보다 큰 경우 가장 10 ** N 으로 나눠 1000보다 작게 변경)
    ***********************************************************************************************************/
    setWordCloud(wordCloudList) {
        const words = [];
        const colorPalette = ["#39D25D", "#2C58CA", "#D2A46B", "#ADDA95", "#4F8EE6", "#CDB9AD", "#7092EB", "#9C8064"];

        if(wordCloudList.length > 0) {
            let maxSize = wordCloudList[0].keywordCnt.toString().length;
            let divideNum = 1;
            if(maxSize - 2 > 0 ) { //  1000
                divideNum = 10 ** (maxSize - 2);
            }
            wordCloudList.forEach((data, idx) => {
                let keywordCnt = Math.round( data.keywordCnt / divideNum );
                if(keywordCnt > 100) {
                    words.push([data.keywordNm, 99])
                } else {
                    words.push([data.keywordNm, keywordCnt])
                }
            });
        }
        new WordCloud(this._applicationElement.querySelector('#wordCloud'), {
            list: words,
            size: 2, // 글꼴 크기
            fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', Roboto, 'Malgun Gothic', '맑은 고딕', Dotum, '돋움', sans-serif", // 글꼴
            fontWeight: '600', // 글자 두께
            gridSize: 1, // 글자 간격 조절
            minRotation: Math.PI/2, // rotation 최소 각도
            maxRotation: Math.PI/2, // rotation 최대 각도
            drawOutOfBound: false, // 바깥으로 나가지 않도록 설정
            rotateRatio: 0.1, // 회전 확률 (0이면 회전 없음)
            shape: 'square', // 워드클라우드 형태 ('circle', 'square', 'star' 등 가능)
            weightFactor: 2, // 글자 크기 조절
            shrinkToFit: true,
            color: (word, weight, fontSize, distance, theta) => {
                const index = words.findIndex(w => w[0] === word); // 단어의 인덱스 찾기
                return colorPalette[index % colorPalette.length]; // 순서대로 색상 적용
            },
        });
    }
    slideDown = (element, duration = 300) => {
        element.style.removeProperty("display");
        let height = element.scrollHeight + "px"; // 🔥 현재 높이를 미리 계산
        element.style.overflow = "hidden";
        element.style.transition = `max-height ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`;
        element.style.maxHeight = "0px";
        element.style.opacity = "0";

        setTimeout(() => {
            element.style.maxHeight = height; // 💡 max-height 조정
            element.style.opacity = "1";
        }, 0);
    };

    slideUp = (element, duration = 300) => {
        element.style.maxHeight = element.scrollHeight + "px"; // 💡 현재 높이에서 시작
        element.style.overflow = "hidden";
        element.style.transition = `max-height ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`;

        setTimeout(() => {
            element.style.maxHeight = "0px";
            element.style.opacity = "0";
        }, 10);
    };


    slideToggle = (element, duration = 300) => {
        if (window.getComputedStyle(element).maxHeight === "0px" || element.style.opacity === "0") {
            this.slideDown(element, duration);
        } else {
            this.slideUp(element, duration);
        }
    };

//    toggle = ()=>{
//        const btn = document.querySelectorAll('[data-function="slideToggle"]');
//
//        btn.forEach((button) => {
//            button.addEventListener("click", () => {
//                const target = document.querySelector(button.getAttribute("data-target"));
//
//                if (target) {
//                    slideToggle(target, 400);
//                }
//            });
//        });
//    }

}
