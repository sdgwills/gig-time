const { toggle, breakTime } = require('../Utils/utils_Tiago')
const { getClient, userInfo, updateGigTime } = require("../Utils/utils.Josh")
const { reducer, sendEmail, getSession, login, axiosPost} = require('../Utils/utils_Jacob')
const { timeConversion, moneyConversion } = require('../Utils/utils_Spencer');

//tiago test1

describe('testing toggle function', () => {
  test('if it is false return true', () => {
    expect(toggle(false)).toBe(true)
  })
  test('if it is true return false', () => {
    expect(toggle(true)).toBe(false)
  })
})

describe('testing function takeBreak', () => {
  test('it will return sum of 2 positive int', () => {
    expect(breakTime(1, 2)).toBe(3)
  })
  test('return the sum of negative int and positive int', () => {
    expect(breakTime(-1, 2)).toBe(1)
  })
  test('return sum of 2 negative int', () => {
    expect(breakTime(-1, -2)).toBe(-3)
  })
})

//Josh Tests

describe("testing axios call for client", () => {
  test("axios call recieves clients for specific gig", async () => {
    getClient("/api/clients", 1).then(response => {
      expect(response).toBeDefined()
    })
  })
  test("axios call recieves clients for specific gig", async () => {
    getClient("/api/clients", 1).then(response => {
      expect(response).toHaveLength(1)
    })
  })
})

describe("testing the userInfo for the redux that will return a type and payload", () => {
  let obj = {num1: 1, num2: 2, num3: 3}
  test("when given an object, it will return the object as well as the type", () => {
    expect(userInfo(obj)).toMatchObject({payload: obj, type: "USERINFO"})
  })
  test("when an object is passed in, the value will be defined", () => {
    expect(userInfo(obj)).toBeDefined()
  })
})

test("test that the updated gig time is passed through and returns the correct value", () => {
  expect(updateGigTime(2)).toMatchObject({payload: 2, type: "UPDATE_GIG_TIME"})
})

//Spencer's tests

describe('testing ms to time function to return either time + sec, min, hour, or day', () => {
  test('test that time passed below 60000 returns a calculation plus Sec ', () => {
    expect(timeConversion(27426).toBe('27.43 Sec'))
  })
  test('test that time passed between 60000 and 6000000 returns a calculation plus Min ', () => {
    expect(timeConversion(326533).toBe('54.42 Min'))
  })
  test('test that time passed below 60000 returns a calculation plus Sec ', () => {
    expect(timeConversion(4903540).toBe('1.36 Hrs'))
  })
  test('test that time passed below 60000 returns a calculation plus Sec ', () => {
    expect(timeConversion(131246807).toBe('1.52 Days'))
  })
})

describe('testing rate conversion function', () => {
  test('given the time in milliseconds and rate per hr it will return a total amount to date', () => {
    expect(moneyConversion(1500, 131246807).toBe('$54686.17'))
  })
})



//Jacob's tests



test('reducer on update gigs should update state', ()=> {
  expect(reducer({}, {
    type:'UPDATE_GIGS', 
    payload: ['gig1', 'gig2', 'gig3']
  })).toEqual({gigs:['gig1', 'gig2', 'gig3']})
  expect(reducer({}, {
    type:'UPDATE_GIGS', 
    payload: ['gig2', 'gig4', 'gig7']
  })).toEqual({gigs:['gig2', 'gig4', 'gig7']})
})


test('sendEmail Should send an email', () => {
expect(sendEmail() ).toEqual('email sent')
})


test('get gig returns an object with a title', ()=> {
  expect(axiosGet('/api/getSingleGig/4')).resolves.toMatchObject({
    id:4, 
    user_id: 1, 
    title: 'afoeiwj', 
    description: 'afoijwfaoweifj', 
    total_time:0, 
    project_rate:1199, 
    client_id:1, 
    is_paid: true, 
    is_builled: true

  })
})


test('Login returns the session', () =>{
  expect(axiosPost.login({
    email:'j@j.com', 
    pass: 'thejoyformidable'
  })).toBeDefined()
})
