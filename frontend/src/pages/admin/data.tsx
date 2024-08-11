export const  PageOptionDropdown = [
    {
      show_name: '-',
      value: '_',
    },
    {
      show_name: 'Home',
      value: 'home',
    },
    {
      show_name: 'Media Center',
      value: 'media_center',
    },
    {
      show_name: 'About us',
      value: 'about_us',
    },
    {
      show_name: 'Projects',
      value: 'projects',
    },
    {
      show_name: 'Advisory',
      value: 'advisory',
    },
    {
      show_name: 'Programs',
      value: 'programs',
    },
  ];

 export const SectionOptionDropdown = {
    home: [
      {
        show_name: '-',
        value: '_',
        input:[]
      },
      {
        show_name: 'Slide Header',
        value: 'header',
        input:[
             
              {
                type:'text',
                name:'car_title',
                show_name:'Title'
  
              },
              {
                type:'text',
                name:'car_link',
                show_name:'Link'
  
              },
  
          ]
      },
      {
        show_name: 'About Us',
        value: 'about_us',
        input:[
             
              {
                type:'text',
                name:'car_title',
                show_name:'Title'
  
              },
              {
                type:'text',
                name:'car_content',
                show_name:'Content'
  
              },
              {
                type:'text',
                name:'car_link',
                show_name:'Link'
  
              },
  
          ]
      },
      {
        show_name: 'Our Services',
        value: 'our_services',
        input:[
          {
            type:'text',
            name:'car_title',
            show_name:'Title'

          },
        ]
  
      },
      {
        show_name: 'Entlaq Programs`Partners',
        value: 'programs_partners',
        input:[
          
        ]
  
      },
      {
        show_name: 'Projects and News',
        value: 'projects_and_news',
        input:[
          
          {
            type:'text',
            name:'car_title',
            show_name:'Title'
          },
  
        ]
  
      },
      {
        show_name: 'Testimonials',
        value: 'testimonials',
        input:[
          {
            type:'text',
            name:'car_content',
            show_name:'Content'
          },
          {
            type:'text',
            name:'car_name',
            show_name:'Name'
          },
          {
            type:'text',
            name:'car_job',
            show_name:'Description'
          },
  
        ]
      },
      {
        show_name: 'Partners',
        value: 'partners',
        input:[
          {
            type:'text',
            name:'car_title',
            show_name:'Title'

          },
          {
            type:'text',
            name:'car_content',
            show_name:'Content'

          }
        ]
      }
    ],
      about_us: [
      {
        show_name: '-',
        value: '_',
        input:[]
      },
      {
        show_name: 'Slide Header',
        value: 'header',
        input:[
          
        ]
  
      },
      {
        show_name: 'Message CEO',
        value: 'message_ceo',
        input:[
          {
            type:'text',
            name:'car_content',
            show_name:'Message'
          }
        ]
  
      },
      {
        show_name: 'Co-founders',
        value: 'co_founders',
        input:[
          {
            type:'text',
            name:'car_name',
            show_name:'Name'
          },
          {
            type:'text',
            name:'car_job',
            show_name:'Job'
          },
          {
            type:'text',
            name:'car_content',
            show_name:'BIO'
          },
          {
            type:'text',
            name:'car_link',
            show_name:'Linkdin URL'
          },
        ]
  
      },
      {
        show_name: 'Team',
        value: 'team',
        input:[
          {
            type:'text',
            name:'car_name',
            show_name:'Name'
          },
          {
            type:'text',
            name:'car_job',
            show_name:'Job'
          },
          {
            type:'text',
            name:'car_content',
            show_name:'BIO'
          }
        ]
  
      },
    ],
    media_center:[
      {
        show_name: '-',
        value: '_',
        input:[]
      },
      {
        show_name: 'Slide Header',
        value: 'header',
        input:[
          
        ] 
      },
      {
        show_name: 'News',
        value: 'news',
        input:[
          {
            type:'text',
            name:'car_title',
            show_name:'Title'

          },
        ]
      },
      {

      show_name: 'Gallery',
        value: 'gallery',
        input:[
          {
            type:'text',
            name:'car_title',
            show_name:'Title'

          },
          {
            type:'date',
            name:'car_content',
            show_name:'Date'

          },
        ]
      },
      {

        show_name: 'Videos',
          value: 'videos',
          input:[
            {
              type:'text',
              name:'car_title',
              show_name:'Title'
  
            },
            {
              type:'text',
              name:'car_link',
              show_name:'URL Video'
  
            }
          ]
        }

    ],
    projects:[
      {
        show_name: '-',
        value: '_',
        input:[]
      },
      {
        show_name: 'Research Products',
        value: 'research_products',
        input:[
          {
            type:'text',
            name:'car_link_text',
            show_name:'Link Text'
          },
          {
            type:'text',
            name:'car_link',
            show_name:'URL Report'
          }
        ]
      },
      
    ],
    advisory:[
      {
        show_name: '-',
        value: '_',
        input:[]
      },
      {
        show_name: 'Slide Header',
        value: 'header',
        input:[
             
              {
                type:'text',
                name:'car_title',
                show_name:'Title'
  
              },
              {
                type:'text',
                name:'car_link',
                show_name:'Link'
  
              },
  
          ]
      },
      {
        show_name: 'Research Products',
        value: 'research_products',
        input:[
             
              {
                type:'text',
                name:'car_title',
                show_name:'Title'
  
              },
              {
                type:'text',
                name:'car_content',
                show_name:'Content'
  
              },
              {
                type:'text',
                name:'car_link_text',
                show_name:'Link Text'
  
              },
              {
                type:'text',
                name:'car_link',
                show_name:'Link'
  
              },
  
          ]
      },{
        show_name: 'Our Advisory Clients',
        value: 'our_Advisory_clients',
        input:[]
      }
    ],
    programs:[
      {
        show_name: '-',
        value: '_',
        input:[]
      },
      {
        show_name: 'Slide Header',
        value: 'header',
        input:[
             
          {
            type:'text',
            name:'car_title',
            show_name:'Title'

          },
          {
            type:'text',
            name:'car_link',
            show_name:'Link'

          },

          ]
      },
      {
        show_name: 'Avilable & Ongoing Programs',
        value: 'progrmas_avilable_and_ongoing',
        input:[
          {
            type:'text',
            name:'car_title',
            show_name:'Title'

          },
          {
            type:'text',
            name:'car_content',
            show_name:'Content'

          },
          {
            type:'text',
            name:'car_link',
            show_name:'Link'

          },
          {
            type:'text',
            name:'car_link_text',
            show_name:'Link Text'

          },
        ]
      },
      {
        show_name: 'Meet Our Program`s Partners',
        value: 'programs_partners',
        input:[]
      },
  ]
    

 }
