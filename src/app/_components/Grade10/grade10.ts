import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-grade10',
  templateUrl: './grade10.html',
  styleUrls: ['./grade10.css']
})
export class Grade10 {
selectedItem: any[];
    closeResult: string;
    noOfCols = 2;
    courses = [
                  {source:'courses',id:'0', code:'ENG2D', subject:'English', credits:'1', grade: '10', pathway: 'University', description:'This course is designed to extend the range of oral communication, reading, writing, and media literacy skills that students need for success in their secondary school academic programs and in their daily lives. Students will analyze literary texts from contemporary and historical periods, interpret and evaluate informational and graphic texts, and create oral, written, and media texts in a variety of forms. An important focus will be on the selective use of strategies that contribute to effective communication. This course is intended to prepare students for the compulsory Grade 11 university or college preparation course.'},
                  {source:'courses',id:'1', code:'MPM2D', subject:'Principles Of Mathematics', credits:'1', grade: '10', pathway: 'University', description:'This course introduces basic features of the function by extending your experiences with quadratic relations. It focuses on quadratic, trigonometric, and exponential functions and their use in modelling real-world situations. You will represent functions numerically, graphically, and algebraically; simplify expressions; solve equations; and solve problems relating to applications. You will reason mathematically and communicate your thinking as you solve multi-step problems.'},
                  {source:'courses',id:'2', code:'SNC2D', subject:'Science', credits:'1', grade: '10', pathway: 'University', description:'This course enables students to enhance their understanding of concepts in biology, chemistry, earth and space science, and physics, and of the interrelationships between science, technology, society, and the environment. Students are also given opportunities to further develop their scientific investigation skills. Students will plan and conduct investigations and develop their understanding of scientific theories related to the connections between cells and systems in animals and plants; chemical reactions, with a particular focus on acid–base reactions; forces that affect climate and climate change; and the interaction of light and matter.'},
                  {source:'courses',id:'3', code:'CHC2D', subject:'History', credits:'1', grade: '10', pathway: 'University', description:'This course explores social, economic, and political developments and events and their impact on the lives of different individuals, groups, and communities, including First Nations, Métis, and Inuit individuals and communities, in Canada since 1914. Students will examine the role of conflict and cooperation in Canadian society, Canada’s evolving role within the global community, and the impact of various individuals, organizations, and events on identities, citizenship, and heritage in Canada. Students will develop an understanding of some of the political developments and government policies that have had a lasting impact on First Nations, Métis, and Inuit individuals and communities.'},
                  {source:'courses',id:'4', code:'BTT20', subject:'Information And Communication Technology', credits:'1', grade: '10', pathway: 'University', description:'This course introduces students to information and communication technology in a business environment and builds a foundation of digital literacy skills necessary for success in a technologically driven society. Students will develop word processing, spreadsheet, database, desktop publishing, presentation software, and website design skills. Throughout the course, there is an emphasis on digital literacy, effective electronic research and communication skills, and current issues related to the impact of information and communication technology.'},
                  {source:'courses',id:'5', code:'CHV2O', subject:'Civics', credits:'1', grade: '10', pathway: 'University', description:'This course explores rights and responsibilities associated with being an active citizen in a democratic society. Students will explore issues of civic importance such as healthy schools, community planning, environmental responsibility, and the influence of social media, while developing their understanding of the role of civic engagement and of political processes in the local, national, and/or global community. Students will apply the concepts of political thinking and the political inquiry process to investigate, and express informed opinions about, a range of political issues and developments that are both of significance in today’s world and of personal interest to them.'},
                  {source:'courses',id:'6', code:'GLC2O', subject:'Career Studies', credits:'1', grade: '10', pathway: 'University', description:'This course gives students the opportunity to develop the skills, knowledge, and habits that will support them in their education and career/life planning. Students will learn about global work trends, and seek opportunities within the school and community to expand and strengthen their transferable skills and their ability to adapt to the changing world of work. On the basis of exploration, reflective practice, and decision-making processes, students will make connections between their skills, interests, and values and their postsecondary options, whether in apprenticeship training, college, community living, university, or the workplace.'},
                  {source:'courses',id:'7', code:'BEP2O', subject:'Launching and Leading a Business', credits:'1', grade: '10', pathway: 'University', description:'This course introduces students to the world of business and what is required to be successful, ethical, and responsible in today’s economy. Students will develop the knowledge and skills needed to be an entrepreneur who knows how to respond to local and global market opportunities. Throughout the course, students will explore and understand the responsibility of managing different functions of a business. This includes accounting, marketing, information and communication technology, financial management, human resources, and production.'},
                  {source:'courses',id:'8', code:'TEJ2O', subject:'Technological Education', credits:'1', grade: '10', pathway: 'University', description:'This course introduces students to computer systems, networking, and interfacing, as well as electronics and robotics. Students will assemble, repair, and configure computers with various types of operating systems and application software. Students will build small electronic circuits and write computer programs to control simple peripheral devices or robots. Students will also develop an awareness of related environmental and societal issues, and will learn about secondary and postsecondary pathways and career opportunities in computer technology. Prerequisite: None'},
                  {source:'courses',id:'9', code:'AVI2O', subject:'Visual Arts', credits:'1', grade: '10', pathway: 'University', description:'This course enables students to develop their skills in producing and presenting art by introducing them to new ideas, materials, and processes for artistic exploration and experimentation. Students will apply the elements and principles of design when exploring the creative process. Students will use the critical analysis process to reflect on and interpret art within a personal, contemporary, and historical context. Prerequisite: None'},
                  {source:'courses',id:'10', code:'PPL2O', subject:'Healthy Active Living Education', credits:'1', grade: '10', pathway: 'University', description:'This course enables students to further develop the knowledge and skills they need to make healthy choices now and lead healthy, active lives in the future. Through participation in a wide range of physical activities, students develop knowledge and skills related to movement competence and personal fitness that provide a foundation for active living. Students also acquire an understanding of the factors and skills that contribute to healthy development and learn how their own well-being is affected by, and affects, the world around them. Students build their sense of self, learn to interact positively with others, and develop their ability to think critically and creatively.'},
                  {source:'courses',id:'11', code:'FSF2D', subject:'French', credits:'1', grade: '10', pathway: 'University', description:'This course enables students to increase their knowledge of the French language and further develop their language skills. Students will communicate about academic and personally relevant topics in real-life situations with increasing independence and fluency.They will continue to develop their skills in listening, speaking, reading, and writing in French, and will expand their understanding of the culture of Francophone communities in Canada and around the world. Emphasis is placed on developing language skills through active and creative use of French in a variety of contexts.'},
                ];
  
    constructor(private router: Router, private modalService: NgbModal) { }
  
    ngOnInit(): void {
    }
  
     open(content, item) {
       this.selectedItem = item;
       this.modalService.open(content, { centered: true }).result.then((result) => {
         this.closeResult = `Closed with: ${result}`;
       }, (reason) => {
         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
       });
     }
   
     private getDismissReason(reason: any): string {
       if (reason === ModalDismissReasons.ESC) {
         return 'by pressing ESC';
       } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
         return 'by clicking on a backdrop';
       } else {
         return `with: ${reason}`;
       }
     }

}