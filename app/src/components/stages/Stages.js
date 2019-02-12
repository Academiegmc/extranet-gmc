import React, { Component } from "react";
// import { connect } from "react-redux";
import {} from "../../actions/usersAction";
// import Slider from "react-slick";
import ReactModal from "react-modal";
import ReturnButton from "../layout/ReturnButton";
ReactModal.setAppElement(document.getElementById("root"));
export default class Stages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      user: {},
      recommendations: [
        {
          message: "Très bon élément qui travaille bien !",
          from: "Employeur 1"
        },
        {
          message:
            "Elément indispensable à notre équipe tout le temps où il était avec nous",
          from: "Employeur 2"
        },
        {
          message: "Elément indispensable !",
          from: "Employeur 3"
        }
      ],
      stages: [
        {
          title: "Développeur full stack",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam molestie pulvinar euismod. Suspendisse eget orci eget felis interdum maximus ac at nulla. Sed laoreet orci eu aliquam vehicula. Duis volutpat cursus massa et auctor. Fusce lobortis purus vel dolor congue sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius neque purus, feugiat accumsan purus bibendum quis. Praesent pulvinar sit amet justo eget vestibulum. Maecenas at faucibus dolor, nec varius quam.",
          name: "JOB Tech",
          dates: "01/01/2019 - 07/01/2019"
        },
        {
          title: "Développeur full stack",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam molestie pulvinar euismod. Suspendisse eget orci eget felis interdum maximus ac at nulla. Sed laoreet orci eu aliquam vehicula. Duis volutpat cursus massa et auctor. Fusce lobortis purus vel dolor congue sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius neque purus, feugiat accumsan purus bibendum quis. Praesent pulvinar sit amet justo eget vestibulum. Maecenas at faucibus dolor, nec varius quam.",
          name: "JOB Tech",
          dates: "01/01/2019 - 07/01/2019"
        },
        {
          title: "Développeur full stack",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam molestie pulvinar euismod. Suspendisse eget orci eget felis interdum maximus ac at nulla. Sed laoreet orci eu aliquam vehicula. Duis volutpat cursus massa et auctor. Fusce lobortis purus vel dolor congue sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius neque purus, feugiat accumsan purus bibendum quis. Praesent pulvinar sit amet justo eget vestibulum. Maecenas at faucibus dolor, nec varius quam.",
          name: "JOB Tech",
          dates: "01/01/2019 - 07/01/2019"
        }
      ]
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  render() {
    // const settings = {
    //   adaptiveHeight: true,
    //   dots: true,
    //   infinite: true,
    //   speed: 500,
    //   slidesToShow: 1,
    //   slidesToScroll: 1,
    //   initialSlide: 0,
    //   responsive: [
    //     {
    //       breakpoint: 1024,
    //       settings: {
    //         slidesToShow: 3,
    //         slidesToScroll: 3,
    //         infinite: true,
    //         dots: true
    //       }
    //     },
    //     {
    //       breakpoint: 600,
    //       settings: {
    //         slidesToShow: 2,
    //         slidesToScroll: 2,
    //         initialSlide: 2
    //       }
    //     },
    //     {
    //       breakpoint: 480,
    //       settings: {
    //         slidesToShow: 1,
    //         slidesToScroll: 1
    //       }
    //     }
    //   ]
    // };
    // let recommendTab = this.state.recommendations.map(
    //   (recommendation, index) => (
    //     <div key={index}>
    //       <blockquote className="">
    //         <p>{recommendation.message}</p>
    //         <i>{recommendation.from}</i>
    //       </blockquote>
    //     </div>
    //   )
    // );
    let stagesTab = this.state.stages.map((stage, index) => (
      <li className="" key={index}>
        <h6>{stage.title}</h6>
        <p>{stage.name}</p>
        <p>{stage.description}</p>
        <p>{stage.dates}</p>
      </li>
    ));
    let { modalIsOpen } = this.state;
    return (
      <div className="container-fluid">
        <ReturnButton history={this.props.history} />
        <div className="row">
          <div className="col-3">
            <div className="d-flex flex-column flex-center">
              <img
                className="img-fluid"
                src={require("../../assets/user.jpg")}
                alt="profile-pic"
              />
              <a
                className="btn btn-primary"
                href="http://localhost:9000/fiches-renseignements/user-fiche.pdf"
              >
                Fiche de renseignement
              </a>
              <a
                className="btn btn-primary"
                href="http://localhost:9000/conventions/user-convention.pdf"
              >
                Convention de stage
              </a>
              <button
                onClick={this.openModal}
                className="btn btn-primary"
                // href="http://localhost:9000/conventions/user-convention.pdf"
              >
                Lettres de recommandations
              </button>
            </div>
          </div>

          <div className="col-9">
            <div className="row d-flex flex-column">
              <h3 className="stage-title">NOM PRENOM</h3>
              <p className="text-muted">Administrateur</p>
            </div>
            <hr />
            <div className="row">
              <h3 className="stage-title">Listes de stages</h3>
              <ul>{stagesTab}</ul>
            </div>
            <hr />
            {/* <div className="row">
              <h3 className="stage-title">Recommandations</h3>
              <div><Slider {...settings}>{recommendTab}</Slider></div>
            </div> */}
          </div>
        </div>
        <ReactModal
          isOpen={modalIsOpen}
          aria={{
            labelledby: "heading",
            describedby: "full_description"
          }}
          className="modal-container flex-column"
        >
          <button onClick={this.closeModal}>
            <i className="far fa-times-circle">Fermer</i>
          </button>
          <h1 id="heading">Lettres de recommandations</h1>
          <div id="full_description" className="flex-column">
            <a href="http://localhost:9000/conventions/user-convention.pdf">
              Lettre 1
            </a>
            <a href="http://localhost:9000/conventions/user-convention.pdf">
              Lettre 2
            </a>
            <a href="http://localhost:9000/conventions/user-convention.pdf">
              Lettre 3
            </a>
            <a href="http://localhost:9000/conventions/user-convention.pdf">
              Lettre 4
            </a>
          </div>
        </ReactModal>
      </div>
    );
  }
}
