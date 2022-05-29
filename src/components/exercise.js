import React, { Component, createRef } from 'react'
import { Link } from "react-router-dom"
import { withRouter } from "../components/HOC/withRouter";

class Exercise extends Component {
    /* ToDO: 
     * Исправить избыточной шаг после пауз (выполнено).
     * Поставить ограничение на нажатие кнопки Приостановить.
     * При нажатии паузы во время перерыва выполнения упражнения сбрасывать таймер 
     * и начинать подсчет выполнения упражнения заново (выполнено).
     */
    constructor(props) {
        super(props);
        this.ms = 1000;
        this.threads = [];                  //Массив звуковых потоков
        this.state = {
            timeID: null,                   //Идентификатор таймера 
            step: 0,                        //Шаг выполнения отсчета таймера 
            countDown: 0,                   //Секунда текущего шага упражнения
            items: [],                      //Список упражнений
            isPaused: false,                //Проверка на паузу
            savedStep: 0,                   //Сохраненный шаг выполнения отсчета таймера во время паузы
            savedCountDown: 0,              //Сохраненная секунда текущего шага во время паузы
            savedTimeID: null,              //Сохраненный идентификатор таймера
        }
        this.pauseBtn = createRef();
        this.startBtn = createRef();
        this.startTimerHandler = this.startTimerHandler.bind(this);
        this.pauseTimerHandler = this.pauseTimerHandler.bind(this);
    }
    componentDidMount() {
        //Обработка нажатия клавиши для запуска таймера
        document.body.onkeyup = (e) => {
            if (e.key === 'p' || e.key === 'з')
                this.pauseBtn.current && this.pauseBtn.current.click();
            if (e.key === 's' || e.key === 'ы')
                this.startBtn.current && this.startBtn.current.click();
        }
    }
    oscillator(...freq) {
        let context;
        try {
            context = new (AudioContext || window.webkitAudioContext)();
        }
        catch (e) {
            console.log("Браузер не поддерживает работу с интерфейсом AudioContent")
        }
        //Управление громкостью сигнала
        freq.forEach(elem => {
            this.threads.push(context.createOscillator());
            let vol = context.createGain();

            this.threads[this.threads.length - 1].connect(vol);
            vol.connect(context.destination);

            vol.gain.value = 0.1;

            this.threads[this.threads.length - 1].frequency.value = elem.toString();
            this.threads[this.threads.length - 1].start(0);
        });
        setTimeout(() => this.stopThreads(), 100);
    }
    stopThreads() {
        this.threads.map(elem => elem.stop(0));
        this.threads = [];
    }
    //Получение внешних данных с сохранением списка упражнений
    static getDerivedStateFromProps(props, state) {
        return {
            items: props.resource.posts.read()
        }
    }
    componentWillUnmount() {
        clearTimeout(this.state.timeID);
        this.stopThreads();
    }
    pauseStep() {
        //Запуск звукового сигнала паузы между повторениями упражнения или его завершением
        this.oscillator(1633, 941);
        this.setState(
            {
                savedTimeID: null,
                timeID: setTimeout(() => {
                    this.start();
                }, this.ms * (this.item.time_pause + this.state.step * this.item.delta_time) 
            )
        })
    }
    start() {
        //Запуск звукового сигнала начала повторения упражнения
        this.oscillator(1209, 852);
        //Запуск метода отображения таймера для тегущего шага
        this.displayCountDown();
        //Записать id таймера в состояние компонента
        this.setState(
            //После окончания повторения упражнения записать новый шаг и запустить таймер паузы
            {
                savedTimeID: null,
                timeID: setTimeout(() => {
                    this.setState(state => {
                        return {
                            step: state.step + 1 //Записать увеличение шага на 1 в состояние компонента
                        }
                    });
                    this.pauseStep();
                    //Определение конца последнего повторения упражнения
                    this.checkLastRepeat(this.state.step, this.item.count_repeat);
                }, this.ms * this.item.time_progress)
            }
        )
    }
    //Метод отображения таймера для тегущего шага
    displayCountDown() {
        this.setState({
            countDown: this.item.time_progress
        });
        //Изменение количества секунд до конца повторения упражнения
        this.changeCountTimer();
    }
    //Проверка на количество повторений, которые больше заданного значения
    checkLastRepeat(step, countRepeat) {  
        if (step >= countRepeat) {
            //Отключить таймер и сбросить значение шага, id таймера и сохраненные параметры по умолчанию
            clearTimeout(this.state.timeID);
            this.setState({
                step: 0,
                timeID: null,
                savedStep: 0,
                savedCountDown: 0,
                savedTimeID: null,
            });
        }
    }
    //Изменение количества секунд до конца повторения упражнения
    changeCountTimer() {
        let time = setInterval(() => {
            this.setState(state => {
                return {
                    countDown: state.countDown - 1
                }
            });
            if (this.state.countDown <= 0) {
                clearInterval(time)
            }
        }, this.ms) 
    }
    startTimerHandler() {
        this.state.timeID || this.state.savedTimeID || this.start();
    }
    pauseTimerHandler() {
        //Определяем время паузы и ожидения запуска таймера выполнения упражения
        if (!this.state.timeID && (!this.state.savedTimeID || !this.state.isPaused)) return;
        clearTimeout(this.state.timeID);
        //Сохраняем состояние предыдущего таймера
        this.setState(state => ({            
            savedStep: state.step,
            savedCountDown: state.countDown,
            savedTimeID: state.savedTimeID || state.timeID,
            step: 0,
            timeID: null,
            countDown: 0,
            isPaused: !state.isPaused,
        }));
        //Определяем период паузы таймера
        if (this.state.isPaused) {
            //После окончания повторения упражнения записать новый шаг и запустить таймер паузы
            this.setState(
                {
                    step: this.state.savedStep,
                    countDown: this.state.savedCountDown,
                    savedStep: 0,                //Шаг выполнения отсчета таймера 
                    savedCountDown: 0,
                }
            )
            this.changeCountTimer();
            //Пауза запущена на этапе текущего повторения упражнения
            if (this.state.savedCountDown > 0)
                //Записать id таймера в состояние компонента
                this.setState(
                    //После окончания повторения упражнения записать новый шаг и запустить таймер паузы
                    {
                        timeID: setTimeout(() => {
                            this.setState(state => {
                                return {
                                    step: state.step + 1, //Записать увеличение шага на 1 в состояние компонента
                                }
                            });
                            this.pauseStep();
                            //Определение конца последнего повторения упражнения
                            this.checkLastRepeat(this.state.step, this.item.count_repeat);
                        }, this.ms * (this.state.savedCountDown))
                    }
                )
            else {
                //Пауза запущена в перерыве между повторениями
                setTimeout(() => {
                    this.start();
                }, this.ms * 3)
            }
        }
    }
    render() {
        try {
            if (this.state.items === "error") 
                throw new Error("Не удается поключиться к json-файлу")
        } catch (e) {
            return <p>{e.message}</p>
        }

        this.item = this.state.items.filter(value => value.link === this.props.params.id)[0]
        if (!this.item) //Проверка на наличие упражнения, указанного в параметре id адресной строки
            return (
                <>
                    <p>Данного упражнения не существует</p>
                    <Link to="/" className="btn btn-primary">Вернуться на главную</Link>
                </>
            )
        return (
            <div className="d-flex ex-wrap mx-4 mb-4 mt-1">
                <img className="ex-img-top img-thumbnail" src={this.item.img} alt="Здесь рыбы нет"></img>
                <div className="ex-wrap-content">
                    <h3>{this.item.title}</h3>
                    <p>{this.item.action}</p>
                    {this.state.timeID || this.state.savedTimeID ? 
                        <>
                            <div className="d-flex">
                                <div className="">
                                    <small>Время окончания <br />повторения</small>
                                    <h1 className="display-3">
                                        {this.state.countDown > 0 ? this.state.countDown : "❚❚"}
                                    </h1>
                                </div>
                                <div className="ms-3">
                                    <small>Количество выполненных <br />повторений</small>
                                    <h1 className="display-3">{this.state.step || this.state.savedStep}</h1>
                                </div>
                            </div>
                            {!this.state.timeID && !this.state.isPaused && 
                                <div className="mb-3">
                                    <small>Приготовьтесь к выполнению повторения выбранного упражнения</small>
                                </div>}
                        </>
                    : ""}

                    <div className="ex-manager-btn">
                        <button 
                            className="btn btn-primary" 
                            disabled={this.state.timeID || this.state.savedTimeID} 
                            onClick={this.startTimerHandler}
                            ref={this.startBtn}>
                            ▷ Запустить (S)
                        </button>
                        <button className="btn btn-primary" 
                            disabled={!this.state.timeID && (!this.state.savedTimeID || !this.state.isPaused)} 
                            onClick={this.pauseTimerHandler}
                            ref={this.pauseBtn}>
                            ❚❚ {!this.state.isPaused ? 'Приостановить' : 'Продолжить'} (P)
                        </button>
                    </div>
                </div>  
            </div>
        )
    }
}

export default withRouter(Exercise, () => {
    
});