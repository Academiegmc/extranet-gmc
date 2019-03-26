import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {} from "../../actions/usersAction";
// import Slider from "react-slick";
import Moment from "react-moment";
import ReactModal from "react-modal";
import ReactMarkdown from "react-markdown";
import ReturnButton from "../layout/ReturnButton";
import { getUser } from "../../actions/usersAction";
ReactModal.setAppElement(document.getElementById("root"));
class Stages extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      user: {},
      disallowedTypes: ["image", "html", "inlineCode", "code"],
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
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam molestie pulvinar euismod. Suspendisse eget orci eget felis interdum maximus ac at nulla. Sed laoreet orci eu aliquam vehicula. Duis volutpat cursus massa et auctor. Fusce lobortis purus vel dolor congue sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius neque purus, feugiat accumsan purus bibendum quis. Praesent pulvinar sit amet justo eget vestibulum. Maecenas at faucibus dolor, nec varius quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam molestie pulvinar euismod. Suspendisse eget orci eget felis interdum maximus ac at nulla. Sed laoreet orci eu aliquam vehicula. Duis volutpat cursus massa et auctor. Fusce lobortis purus vel dolor congue sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius neque purus, feugiat accumsan purus bibendum quis. Praesent pulvinar sit amet justo eget vestibulum. Maecenas at faucibus dolor, nec varius quam.            ",
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
  componentDidUpdate(prevProps, prevState) {
    // console.log(this.props.users.user.user);
    if (this.props.users.user.user)
      this.setState({ user: this.props.users.user.user });
  }
  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }

  render() {
    const { user } = this.state;
    let displayExperiences;
    if (user.experiences !== undefined && user.experiences.length > 0) {
      displayExperiences = user.experiences.map((exp, index) => (
        <li className="col-9" key={index}>
          <h6 className="text-justify p-2">{exp.poste}</h6>
          <p className="text-justify p-2">{exp.name}</p>
          <ReactMarkdown
            className="text-justify p-2"
            source={exp.description}
            disallowedTypes={this.state.disallowedTypes}
          />
          <p className="text-justify font-weight-bold p-2">
            Du{" "}
            <Moment locale="fr" format="DD MMMM YYYY">
              {exp.start_date}
            </Moment>{" "}
            au{" "}
            <Moment locale="fr" format="DD MMMM YYYY">
              {exp.end_date}
            </Moment>
          </p>
        </li>
      ));
    } else {
      displayExperiences = <h3>Chargement...</h3>;
    }
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
                href={`http://${
                  process.env.REACT_APP_NODE_API
                }/fiches-renseignements/user-fiche.pdf`}
              >
                Fiche de renseignement
              </a>
              <a
                className="btn btn-primary"
                href={`http://${
                  process.env.REACT_APP_NODE_API
                }//conventions/user-convention.pdf`}
              >
                Convention de stage
              </a>
              <button onClick={this.openModal} className="btn btn-primary">
                Lettres de recommandations
              </button>
            </div>
          </div>

          <div className="col-9">
            <div className="row d-flex flex-column">
              <h3 className="stage-title">
                {user.name !== undefined ? user.name : "Chargement..."}
              </h3>
              <p className="text-muted">Administrateur</p>
            </div>
            <hr />
            <div className="row">
              <h3 className="stage-title">Listes de stages</h3>
              <ul>{displayExperiences}</ul>
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
          className="container"
        >
          <div
            style={{ border: "1px solid black", borderRadius: "5px" }}
            className="mt-3"
          >
            <button className="btn btn-outline-dark" onClick={this.closeModal}>
              <i className="far fa-times-circle">Fermer</i>
            </button>
            <h1 id="heading" className="text-center mt-3 mb-3">
              Lettres de recommandations
            </h1>
            <div
              id="full_description"
              className="d-flex justify-content-around"
            >
              <a
                className="btn btn-link"
                href="http://178.62.8.23:9000/conventions/user-convention.pdf"
              >
                Lettre 1
              </a>
              <a
                className="btn btn-link"
                href="http://178.62.8.23:9000/conventions/user-convention.pdf"
              >
                Lettre 2
              </a>
              <a
                className="btn btn-link"
                href="http://178.62.8.23:9000/conventions/user-convention.pdf"
              >
                Lettre 3
              </a>
              <a
                className="btn btn-link"
                href="http://178.62.8.23:9000/conventions/user-convention.pdf"
              >
                Lettre 4
              </a>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});
export default connect(
  mapStateToProps,
  { getUser }
)(Stages);
