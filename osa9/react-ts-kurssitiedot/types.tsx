export interface CoursePartBase {
    name: string;
    exerciseCount: number;
}
  
export interface CoursePartBasic extends CoursePartBase {
    kind: "basic"
}
  
export interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
}
  
export interface CoursePartBackground extends CoursePartBase {
    backgroundMaterial: string;
    kind: "background"
}
  
export interface CoursePartBase {
    description?: string;
}

export interface CoursePartRequired {
    name: string,
    exerciseCount: number,
    description: string,
    requirements: string[],
    kind: "special"
}
  
type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequired;

export default CoursePart;