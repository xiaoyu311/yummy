let data = [
  [
    {name: '含水分', uv: 20, percent:'含水分20%', month:'1月', sale:400},
    {name: '麦芽糖', uv: 35, percent:'含麦芽糖35%', month:'2月', sale:800},
    {name: '巧克力', uv: 20, percent:'含巧克力20%', month:'3月', sale:600},
    {name: '热量', uv: 25, percent:'含热量25%', month:'4月', sale:400},
    { month:'5月份', sale:700},
    '597be20c2bbfdbaa14bfa248'
  ],
  [
    {name: '含水分', uv: 35, percent:'含水分35%', month:'1月', sale:300},
    {name: '麦芽糖', uv: 25, percent:'含麦芽糖25%', month:'2月', sale:700},
    {name: '巧克力', uv: 25, percent:'含巧克力25%', month:'3月', sale:500},
    {name: '热量', uv: 15, percent:'含热量15%', month:'4月', sale:600},
    { month:'5月份', sale:200},
    '597be2122bbfdbaa14bfa249'
  ],
  [
    {name: '含水分', uv: 40, percent:'含水分40%', month:'1月', sale:350},
    {name: '麦芽糖', uv: 15, percent:'含麦芽糖15%', month:'2月', sale:450},
    {name: '巧克力', uv: 35, percent:'含巧克力35%', month:'3月', sale:200},
    {name: '热量', uv: 10, percent:'含热量10%', month:'4月', sale:700},
    { month:'5月份', sale:350},
    '597be2182bbfdbaa14bfa24a'
  ]
]
export default function rechartReducer(state = data, actions) {
  switch (actions.type) {
    case 'SHOW_THIS':
      return state
    default:
      return state
  }
}
