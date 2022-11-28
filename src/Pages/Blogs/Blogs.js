import React from 'react';
import pic1 from './blogs/pic1.png'
import inherit from './blogs/inheritance.png'
import rav from './blogs/rav.png'
import unit from './blogs/unit.jpg'


const Blogs = () => {
   
    return (
        <div className='grid  bg-gradient-to-r from-green-100 to-blue-300 lg:grid-cols-3 sm:grid-cols-1 gap-3 p-4 mb-10 mt-1 rounded-3xl'>

            <div className="card bg-base-100 shadow-xl">
                <figure><img src={pic1} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">What are the different ways to manage a state in a React application?
                    </h2>
                    <p>In React apps, there are at least three ways to handle the state. Let us briefly explore a few of them in this part.


                        The  option is to store the state in the browser via web storage. This is useful when we want to persist state between reloads and reboots. Examples include cookies, local storage, and IndexedDB. These are native browser technologies....

                    </p>

                    <div>
                        {/* The button to open modal */}
                        <label htmlFor="my-modal4" className="btn">View Details</label>

                        {/* Put this part before </body> tag */}
                        <input type="checkbox" id="my-modal4" className="modal-toggle" />
                        <div className="modal">
                            <div className="modal-box">
                                <h2 className="card-title">What are the different ways to manage a state in a React application?
                                </h2>
                                <p>In React apps, there are at least three ways to handle the state. Let us briefly explore a few of them in this part.


                                    The  option is to store the state in the browser via web storage. This is useful when we want to persist state between reloads and reboots. Examples include cookies, local storage, and IndexedDB. These are native browser technologies.

                                    Data persisted in the browser is tied to a single browser. So, if the user loads the site in a different browser, the data will not be available.

                                    We avoid storing sensitive data in the browser since the user may access the app on a shared machine. Some examples of where web storage might be most useful include storing a users shopping cart, saving partially completed form data or storing JWT token in HttpOnly Cookie.



                                    Data persisted in the browser is tied to a single browser. So, if the user loads the site in a different browser, the data will not be available.
                                </p>
                                <div className="modal-action">
                                    <label htmlFor="my-modal4" className="btn">Done</label>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>





            <div className="card bg-base-100 shadow-xl">
                <figure><img src={inherit} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">How does prototypical inheritance work?
                    </h2>
                    <p>The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object....</p>

                    <div>
                        {/* The button to open modal */}
                        <label htmlFor="my-modal3" className="btn">View Details</label>

                        {/* Put this part before </body> tag */}
                        <input type="checkbox" id="my-modal3" className="modal-toggle" />
                        <div className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">HHow does prototypical inheritance work?</h3>
                                <p className="py-4">The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.</p>
                                <div className="modal-action">
                                    <label htmlFor="my-modal3" className="btn">Done</label>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>






            <div className="card bg-base-100 shadow-xl">
                <figure><img src={unit} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">What is a unit test? Why should we write unit tests?
                    </h2>
                    <p>The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process,.... </p>

                    <div>
                        {/* The button to open modal */}
                        <label htmlFor="my-modal2" className="btn">View Details</label>

                        {/* Put this part before </body> tag */}
                        <input type="checkbox" id="my-modal2" className="modal-toggle" />
                        <div className="modal">
                            <div className="modal-box">
                                <h2 className="card-title">What is a unit test? Why should we write unit tests?
                                </h2>
                                <p>The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages. </p>
                                <div className="modal-action">
                                    <label htmlFor="my-modal2" className="btn">Done</label>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>




            <div className="card bg-base-100 shadow-xl">
                <figure><img src={rav} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">React vs. Angular vs. Vue?
                    </h2>
                    <p>Angular is a front-end framework with lots of components, services, and tools. On Angular’s site, you can see that they define Angular as:

                        “The modern web developer’s platform”

                        It is developed and maintained by Google developers, but curiously it is not used to implement any of their most common products such as Search or YouTube.....  </p>

                    <div>
                        {/* The button to open modal */}
                        <label htmlFor="my-modal1" className="btn">View Details</label>

                        {/* Put this part before </body> tag */}
                        <input type="checkbox" id="my-modal1" className="modal-toggle" />
                        <div className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">React vs. Angular vs. Vue?</h3>
                                <p className="py-4"><p> Angular is a front-end framework with lots of components, services, and tools. On Angular’s site, you can see that they define Angular as:

                                    “The modern web developer’s platform”

                                    It is developed and maintained by Google developers, but curiously it is not used to implement any of their most common products such as Search or YouTube.



                                    React is considered a UI library. They define themselves as:

                                    “A JavaScript library for building user interfaces”

                                    Facebook developers are behind the development and maintenance of this library. And, in this case, most of Facebook’s products are made with React.



                                    Last but not least, Vue.js is, according to its site:

                                    “A progressive JavaScript framework”

                                    Vue.js is developed and led by Evan You, but also it counts on a huge open-source community.



                                    These three frameworks have several things in common, such as each follows a component-based architecture and allows creating UI features quickly. React and Vue.js are mainly declarative, and while Angular could also be declarative, it’s really more imperative. Nevertheless, they present some more differences according to their structure, architecture and way of working, so let’s dive into all these characteristics.
                                </p></p>
                                <div className="modal-action">
                                    <label htmlFor="my-modal1" className="btn">Done</label>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default Blogs;