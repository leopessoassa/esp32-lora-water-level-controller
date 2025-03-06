/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2025-01-08 20:13:40.

export interface Cistern extends AbstractEntity {
  qrCode: string;
  city: City;
  state: State;
  type: number;
  owner: Owner;
  createdAt: Date;
  updatedAt: Date;
}

export interface CisternResponse {
  id: number;
  qrCode: string;
  city: CityResponse;
  state: StateResponse;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCisternRequest {
  qrCode: string;
  cityId: number;
  stateId: number;
  type: CisternTypeEnum;
  ownerId: number;
}

export interface UpdateCisternRequest {
  cityId: number;
  stateId: number;
  type: CisternTypeEnum;
}

export interface SumaryResponse {
  average: number;
  date: string;
  time: string;
}

export interface City extends AbstractEntity {
  name: string;
  state: State;
  isCapital: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CityResponse {
  id: number;
  name: string;
  isCapital: boolean;
  state: StateResponse;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCityRequest {
  name: string;
  isCapital: boolean;
  stateId: number;
}

export interface UpdateCityRequest {
  name: string;
  isCapital: boolean;
  stateId: number;
}

export interface Owner extends AbstractEntity {
  name: string;
  email: string;
  city: City;
  state: State;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOwnerRequest {
  name: string;
  email: string;
  stateId: number;
  cityId: number;
}

export interface OwnerResponse {
  id: number;
  name: string;
  email: string;
  city: CityResponse;
  state: StateResponse;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateOwnerRequest {
  name: string;
  stateId: number;
  cityId: number;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  url: string;
  delivered: boolean;
  createdAt: Date;
}

export interface NotificationPermissionRequest {
  id?: number;
  requestedBy: RequestEvent;
  deniedReason: DeniedReason;
  createdAt?: Date;
}

export interface PushNotificationSubscription {
  id: number;
  endpoint: string;
  p256dhKey: string;
  authKey: string;
}

export interface SendNotificationRequest {
  title: string;
  message: string;
  url: string;
}

export interface SubscriptionRequest {
  endpoint: string;
  p256dh: string;
  auth: string;
}

export interface State extends AbstractEntity {
  name: string;
  uf: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateStateRequest {
  name: string;
  uf: string;
}

export interface StateResponse {
  id: number;
  name: string;
  uf: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateStateRequest {
  name: string;
  uf: string;
}

export interface PasswordResetToken extends AbstractEntity {
  token: string;
  emailSent: boolean;
  expiresAt: Date;
  user: User;
  expired: boolean;
}

export interface User extends AbstractEntity, UserDetails {
  email: string;
  firstName: string;
  lastName: string;
  verified: boolean;
  profileImageUrl: string;
  role: Role;
  verificationCode: VerificationCode;
  connectedAccounts: UserConnectedAccount[];
}

export interface UserConnectedAccount extends AbstractEntity {
  provider: string;
  providerId: string;
  connectedAt: Date;
  user: User;
}

export interface VerificationCode extends AbstractEntity {
  code: string;
  emailSent: boolean;
  user: User;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  passwordConfirmation: string;
  firstName?: string;
  lastName?: string;
  role?: Role;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface UpdateUserPasswordRequest {
  oldPassword: string;
  password: string;
  confirmPassword: string;
  passwordResetToken: string;
}

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
}

export interface UserResponse {
  id: number;
  role: Role;
  firstName?: string;
  lastName?: string;
  email: string;
  profileImageUrl?: string;
  verified: boolean;
  connectedAccounts: ConnectedAccountResponse[];
  authorities: string[];
}

export interface WaterLevel extends AbstractEntity {
  measurementDate: Date;
  measurementValue: number;
  cistern: Cistern;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateWaterLevelRequest {
  measurementDate: number;
  measurementValue: number;
  cisternId: number;
}

export interface UpdateWaterLevelRequest {
  measurementDate: number;
  measurementValue: number;
}

export interface WaterLevelResponse {
  id: number;
  measurementDate: Date;
  measurementValue: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UploadedFile extends AbstractEntity {
  url: string;
  size: number;
  originalFileName: string;
  extension: string;
  createdAt: Date;
  uploadedAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AbstractEntity {
  id: number;
}

export interface GrantedAuthority extends Serializable {
  authority: string;
}

export interface UserDetails extends Serializable {
  enabled: boolean;
  username: string;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
  password: string;
  authorities: GrantedAuthority[];
  accountNonLocked: boolean;
}

export interface MultipartFile extends InputStreamSource {
  name: string;
  bytes: number[];
  empty: boolean;
  resource: Resource;
  size: number;
  originalFilename: string;
  contentType: string;
}

export interface RedirectView extends AbstractUrlBasedView, SmartView {
  hosts: string[];
  propagateQueryProperties: boolean;
  servletContext: ServletContext;
  exposeContextBeansAsAttributes: boolean;
  exposedContextBeanNames: string[];
  contextRelative: boolean;
  http10Compatible: boolean;
  exposeModelAttributes: boolean;
  encodingScheme: string;
  statusCode: HttpStatus;
  expandUriTemplateVariables: boolean;
  propagateQueryParams: boolean;
  attributes: { [index: string]: any };
  attributesCSV: string;
}

export interface ConnectedAccountResponse {
  provider: string;
  connectedAt: Date;
}

export interface PagedResponse<T> {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  data: T[];
}

export interface Serializable {}

export interface Resource extends InputStreamSource {
  open: boolean;
  file: File;
  readable: boolean;
  url: URL;
  description: string;
  filename: string;
  uri: URI;
}

export interface InputStream extends Closeable {}

export interface InputStreamSource {
  inputStream: InputStream;
}

export interface ApplicationContext
  extends EnvironmentCapable,
    ListableBeanFactory,
    HierarchicalBeanFactory,
    MessageSource,
    ApplicationEventPublisher,
    ResourcePatternResolver {
  parent: ApplicationContext;
  id: string;
  displayName: string;
  autowireCapableBeanFactory: AutowireCapableBeanFactory;
  applicationName: string;
  startupDate: number;
}

export interface ServletContext {
  classLoader: ClassLoader;
  majorVersion: number;
  minorVersion: number;
  attributeNames: Enumeration<string>;
  responseCharacterEncoding: string;
  requestCharacterEncoding: string;
  effectiveSessionTrackingModes: SessionTrackingMode[];
  defaultSessionTrackingModes: SessionTrackingMode[];
  virtualServerName: string;
  filterRegistrations: { [index: string]: FilterRegistration };
  effectiveMajorVersion: number;
  effectiveMinorVersion: number;
  jspConfigDescriptor: JspConfigDescriptor;
  sessionCookieConfig: SessionCookieConfig;
  servletRegistrations: { [index: string]: ServletRegistration };
  initParameterNames: Enumeration<string>;
  servletContextName: string;
  sessionTimeout: number;
  /**
   * @deprecated
   */
  servlets: Enumeration<Servlet>;
  serverInfo: string;
  /**
   * @deprecated
   */
  servletNames: Enumeration<string>;
  contextPath: string;
}

export interface AbstractUrlBasedView extends AbstractView, InitializingBean {
  url: string;
}

export interface SmartView extends View {
  redirectView: boolean;
}

export interface File extends Serializable, Comparable<File> {}

export interface URL extends Serializable {}

export interface URI extends Comparable<URI>, Serializable {}

export interface Closeable extends AutoCloseable {}

export interface AutowireCapableBeanFactory extends BeanFactory {}

export interface Environment extends PropertyResolver {
  activeProfiles: string[];
  defaultProfiles: string[];
}

export interface BeanFactory {}

export interface ClassLoader {}

export interface EnvironmentCapable {
  environment: Environment;
}

export interface ListableBeanFactory extends BeanFactory {
  beanDefinitionNames: string[];
  beanDefinitionCount: number;
}

export interface HierarchicalBeanFactory extends BeanFactory {
  parentBeanFactory: BeanFactory;
}

export interface MessageSource {}

export interface ApplicationEventPublisher {}

export interface ResourcePatternResolver extends ResourceLoader {}

export interface Enumeration<E> {}

export interface FilterRegistration extends Registration {
  urlPatternMappings: string[];
  servletNameMappings: string[];
}

export interface JspConfigDescriptor {
  jspPropertyGroups: JspPropertyGroupDescriptor[];
  taglibs: TaglibDescriptor[];
}

export interface SessionCookieConfig {
  name: string;
  path: string;
  comment: string;
  secure: boolean;
  maxAge: number;
  domain: string;
  httpOnly: boolean;
}

export interface ServletRegistration extends Registration {
  mappings: string[];
  runAsRole: string;
}

export interface Servlet {
  servletConfig: ServletConfig;
  servletInfo: string;
}

export interface AbstractView
  extends WebApplicationObjectSupport,
    View,
    BeanNameAware {
  requestContextAttribute: string;
  staticAttributes: { [index: string]: any };
  exposePathVariables: boolean;
  beanName: string;
  attributesMap: { [index: string]: any };
}

export interface InitializingBean {}

export interface View {
  contentType: string;
}

export interface AutoCloseable {}

export interface PropertyResolver {}

export interface ResourceLoader {
  classLoader: ClassLoader;
}

export interface Registration {
  name: string;
  className: string;
  initParameters: { [index: string]: string };
}

export interface JspPropertyGroupDescriptor {
  buffer: string;
  defaultContentType: string;
  scriptingInvalid: string;
  deferredSyntaxAllowedAsLiteral: string;
  trimDirectiveWhitespaces: string;
  errorOnUndeclaredNamespace: string;
  isXml: string;
  elIgnored: string;
  includePreludes: string[];
  includeCodas: string[];
  urlPatterns: string[];
  pageEncoding: string;
}

export interface TaglibDescriptor {
  taglibLocation: string;
  taglibURI: string;
}

export interface ServletConfig {
  initParameterNames: Enumeration<string>;
  servletName: string;
  servletContext: ServletContext;
}

export interface WebApplicationObjectSupport
  extends ApplicationObjectSupport,
    ServletContextAware {}

export interface BeanNameAware extends Aware {}

export interface Comparable<T> {}

export interface ApplicationObjectSupport extends ApplicationContextAware {
  applicationContext: ApplicationContext;
}

export interface ServletContextAware extends Aware {}

export interface Aware {}

export interface ApplicationContextAware extends Aware {}

export interface HttpClient {
  request<R>(requestConfig: {
    method: string;
    url: string;
    params?: any;
    data?: any;
    copyFn?: (data: R) => R;
  }): RestResponse<R>;
}

export class RestApplicationClient {
  constructor(protected httpClient: HttpClient) {}

  /**
   * HTTP GET /api/admin/users
   * Java method: com.leopessoa.engineer.api.admin.controller.AdminUsersController.admin_getUsers
   */
  admin_getUsers(params?: {
    page?: number;
  }): RestResponse<PagedResponse<UserResponse>> {
    return this.httpClient.request({
      method: "GET",
      url: uriEncoding`api/admin/users`,
      params: params,
    });
  }

  /**
   * HTTP GET /api/auth/csrf
   * Java method: com.leopessoa.engineer.api.auth.controller.AuthController.csrf
   */
  csrf(): RestResponse<any> {
    return this.httpClient.request({
      method: "GET",
      url: uriEncoding`api/auth/csrf`,
    });
  }

  /**
   * HTTP POST /api/auth/login
   * Java method: com.leopessoa.engineer.api.auth.controller.AuthController.login
   */
  login(body: LoginRequest): RestResponse<any> {
    return this.httpClient.request({
      method: "POST",
      url: uriEncoding`api/auth/login`,
      data: body,
    });
  }

  /**
   * HTTP POST /api/auth/logout
   * Java method: com.leopessoa.engineer.api.auth.controller.AuthController.logout
   */
  logout(): RestResponse<void> {
    return this.httpClient.request({
      method: "POST",
      url: uriEncoding`api/auth/logout`,
    });
  }

  /**
   * HTTP GET /api/auth/me
   * Java method: com.leopessoa.engineer.api.auth.controller.AuthController.getSession
   */
  getSession(): RestResponse<UserResponse> {
    return this.httpClient.request({
      method: "GET",
      url: uriEncoding`api/auth/me`,
    });
  }

  /**
   * HTTP POST /api/cisterns
   * Java method: com.leopessoa.engineer.api.models.cisterns.controller.CisternController.cistern_create
   */
  cistern_create(request: CreateCisternRequest): RestResponse<CisternResponse> {
    return this.httpClient.request({
      method: "POST",
      url: uriEncoding`api/cisterns`,
      data: request,
    });
  }

  /**
   * HTTP GET /api/cisterns
   * Java method: com.leopessoa.engineer.api.models.cisterns.controller.CisternController.cistern_list
   */
  cistern_list(params?: {
    qrCode?: string;
    cityId?: number;
    stateId?: number;
    userId?: number;
    type?: number;
    page?: number;
    size?: number;
    sort?: string;
  }): RestResponse<PagedResponse<CisternResponse>> {
    return this.httpClient.request({
      method: "GET",
      url: uriEncoding`api/cisterns`,
      params: params,
    });
  }

  /**
   * HTTP DELETE /api/cisterns/{id}
   * Java method: com.leopessoa.engineer.api.models.cisterns.controller.CisternController.cistern_delete
   */
  cistern_delete(id: number): RestResponse<boolean> {
    return this.httpClient.request({
      method: "DELETE",
      url: uriEncoding`api/cisterns/${id}`,
    });
  }

  /**
   * HTTP GET /api/cisterns/{id}
   * Java method: com.leopessoa.engineer.api.models.cisterns.controller.CisternController.cistern_detail
   */
  cistern_detail(id: number): RestResponse<CisternResponse> {
    return this.httpClient.request({
      method: "GET",
      url: uriEncoding`api/cisterns/${id}`,
    });
  }

  /**
   * HTTP PUT /api/cisterns/{id}
   * Java method: com.leopessoa.engineer.api.models.cisterns.controller.CisternController.cistern_update
   */
  cistern_update(
    id: number,
    request: UpdateCisternRequest
  ): RestResponse<CisternResponse> {
    return this.httpClient.request({
      method: "PUT",
      url: uriEncoding`api/cisterns/${id}`,
      data: request,
    });
  }

  /**
   * HTTP GET /api/cisterns/find/{qrCode}
   * Java method: com.leopessoa.engineer.api.models.cisterns.controller.CisternController.cistern_find
   */
  cistern_find(qrCode: string): RestResponse<CisternResponse> {
    return this.httpClient.request({
      method: "GET",
      url: uriEncoding`api/cisterns/find/${qrCode}`,
    });
  }

  sumary_last_measurement(qrCode: string): RestResponse<SumaryResponse[]> {
    return this.httpClient.request({
      method: "GET",
      url: uriEncoding`api/sumaries/last-measurement/${qrCode}`,
    });
  }

  sumary_by_month(
    qrCode: string,
    params: {
      year: number;
      month: number;
    }
  ): RestResponse<SumaryResponse[]> {
    return this.httpClient.request({
      method: "GET",
      url: uriEncoding`api/sumaries/by-month/${qrCode}`,
      params,
    });
  }

  sumary_by_date(
    qrCode: string,
    params: { date: string }
  ): RestResponse<SumaryResponse[]> {
    return this.httpClient.request({
      method: "GET",
      url: uriEncoding`api/sumaries/by-date/${qrCode}`,
      params,
    });
  }

  sumary_last(qrCode: string): RestResponse<SumaryResponse> {
    return this.httpClient.request({
      method: "GET",
      url: uriEncoding`api/sumaries/last/${qrCode}`,
    });
  }

  /**
   * HTTP POST /api/cities
   * Java method: com.leopessoa.engineer.api.models.cities.controller.CityController.city_create
   */
  city_create(request: CreateCityRequest): RestResponse<CityResponse> {
    return this.httpClient.request({
      method: "POST",
      url: uriEncoding`api/cities`,
      data: request,
    });
  }

  /**
   * HTTP GET /api/cities
   * Java method: com.leopessoa.engineer.api.models.cities.controller.CityController.city_list
   */
  city_list(params?: {
    name?: string;
    uf?: string;
    isCapital?: boolean;
    page?: number;
    size?: number;
    sort?: string;
  }): RestResponse<PagedResponse<CityResponse>> {
    return this.httpClient.request({
      method: "GET",
      url: uriEncoding`api/cities`,
      params: params,
    });
  }

  /**
   * HTTP DELETE /api/cities/{id}
   * Java method: com.leopessoa.engineer.api.models.cities.controller.CityController.city_delete
   */
  city_delete(id: number): RestResponse<boolean> {
    return this.httpClient.request({
      method: "DELETE",
      url: uriEncoding`api/cities/${id}`,
    });
  }

  /**
   * HTTP GET /api/cities/{id}
   * Java method: com.leopessoa.engineer.api.models.cities.controller.CityController.city_detail
   */
  city_detail(id: number): RestResponse<CityResponse> {
    return this.httpClient.request({
      method: "GET",
      url: uriEncoding`api/cities/${id}`,
    });
  }

  /**
   * HTTP PUT /api/cities/{id}
   * Java method: com.leopessoa.engineer.api.models.cities.controller.CityController.city_update
   */
  city_update(
    id: number,
    request: UpdateCityRequest
  ): RestResponse<CityResponse> {
    return this.httpClient.request({
      method: "PUT",
      url: uriEncoding`api/cities/${id}`,
      data: request,
    });
  }

  /**
   * HTTP POST /api/notifications/delivery/{id}
   * Java method: com.leopessoa.engineer.api.models.pushNotifications.controller.NotificationsController.pushNotificationDelivery
   */
  pushNotificationDelivery(id: number): RestResponse<void> {
    return this.httpClient.request({
      method: "POST",
      url: uriEncoding`api/notifications/delivery/${id}`,
    });
  }

  /**
   * HTTP POST /api/notifications/denied
   * Java method: com.leopessoa.engineer.api.models.pushNotifications.controller.NotificationsController.pushNotificationRequestDenied
   */
  pushNotificationRequestDenied(
    request: NotificationPermissionRequest
  ): RestResponse<void> {
    return this.httpClient.request({
      method: "POST",
      url: uriEncoding`api/notifications/denied`,
      data: request,
    });
  }

  /**
   * HTTP POST /api/notifications/notify
   * Java method: com.leopessoa.engineer.api.models.pushNotifications.controller.NotificationsController.pushNotificationNotify
   */
  pushNotificationNotify(request: SendNotificationRequest): RestResponse<void> {
    return this.httpClient.request({
      method: "POST",
      url: uriEncoding`api/notifications/notify`,
      data: request,
    });
  }

  /**
   * HTTP POST /api/notifications/subscribe
   * Java method: com.leopessoa.engineer.api.models.pushNotifications.controller.NotificationsController.pushNotificationSubscribe
   */
  pushNotificationSubscribe(request: SubscriptionRequest): RestResponse<void> {
    return this.httpClient.request({
      method: "POST",
      url: uriEncoding`api/notifications/subscribe`,
      data: request,
    });
  }

  /**
   * HTTP POST /api/owners
   * Java method: com.leopessoa.engineer.api.models.owners.controller.OwnerController.owner_create
   */
  owner_create(request: CreateOwnerRequest): RestResponse<OwnerResponse> {
    return this.httpClient.request({
      method: "POST",
      url: uriEncoding`api/owners`,
      data: request,
    });
  }

  /**
   * HTTP GET /api/owners
   * Java method: com.leopessoa.engineer.api.models.owners.controller.OwnerController.owner_list
   */
  owner_list(params?: {
    name?: string;
    email?: string;
    stateId?: number;
    cityId?: number;
    page?: number;
    size?: number;
    sort?: string;
  }): RestResponse<PagedResponse<OwnerResponse>> {
    return this.httpClient.request({
      method: "GET",
      url: uriEncoding`api/owners`,
      params: params,
    });
  }

  /**
   * HTTP DELETE /api/owners/{id}
   * Java method: com.leopessoa.engineer.api.models.owners.controller.OwnerController.owner_delete
   */
  owner_delete(id: number): RestResponse<boolean> {
    return this.httpClient.request({
      method: "DELETE",
      url: uriEncoding`api/owners/${id}`,
    });
  }

  /**
   * HTTP GET /api/owners/{id}
   * Java method: com.leopessoa.engineer.api.models.owners.controller.OwnerController.owner_detail
   */
  owner_detail(id: number): RestResponse<OwnerResponse> {
    return this.httpClient.request({
      method: "GET",
      url: uriEncoding`api/owners/${id}`,
    });
  }

  /**
   * HTTP PUT /api/owners/{id}
   * Java method: com.leopessoa.engineer.api.models.owners.controller.OwnerController.owner_update
   */
  owner_update(
    id: number,
    request: UpdateOwnerRequest
  ): RestResponse<OwnerResponse> {
    return this.httpClient.request({
      method: "PUT",
      url: uriEncoding`api/owners/${id}`,
      data: request,
    });
  }

  /**
   * HTTP POST /api/states
   * Java method: com.leopessoa.engineer.api.models.states.controller.StateController.state_create
   */
  state_create(request: CreateStateRequest): RestResponse<StateResponse> {
    return this.httpClient.request({
      method: "POST",
      url: uriEncoding`api/states`,
      data: request,
    });
  }

  /**
   * HTTP GET /api/states
   * Java method: com.leopessoa.engineer.api.models.states.controller.StateController.state_list
   */
  state_list(params?: {
    name?: string;
    uf?: string;
    page?: number;
    size?: number;
    sort?: string;
  }): RestResponse<PagedResponse<StateResponse>> {
    return this.httpClient.request({
      method: "GET",
      url: uriEncoding`api/states`,
      params: params,
    });
  }

  /**
   * HTTP DELETE /api/states/{id}
   * Java method: com.leopessoa.engineer.api.models.states.controller.StateController.state_delete
   */
  state_delete(id: number): RestResponse<boolean> {
    return this.httpClient.request({
      method: "DELETE",
      url: uriEncoding`api/states/${id}`,
    });
  }

  /**
   * HTTP GET /api/states/{id}
   * Java method: com.leopessoa.engineer.api.models.states.controller.StateController.state_detail
   */
  state_detail(id: number): RestResponse<StateResponse> {
    return this.httpClient.request({
      method: "GET",
      url: uriEncoding`api/states/${id}`,
    });
  }

  /**
   * HTTP PUT /api/states/{id}
   * Java method: com.leopessoa.engineer.api.models.states.controller.StateController.state_update
   */
  state_update(
    id: number,
    request: UpdateStateRequest
  ): RestResponse<StateResponse> {
    return this.httpClient.request({
      method: "PUT",
      url: uriEncoding`api/states/${id}`,
      data: request,
    });
  }

  /**
   * HTTP POST /api/users
   * Java method: com.leopessoa.engineer.api.models.users.controller.UsersController.user_create
   */
  user_create(request: CreateUserRequest): RestResponse<UserResponse> {
    return this.httpClient.request({
      method: "POST",
      url: uriEncoding`api/users`,
      data: request,
    });
  }

  /**
   * HTTP GET /api/users
   * Java method: com.leopessoa.engineer.api.models.users.controller.UsersController.user_list
   */
  user_list(params?: {
    email?: string;
    role?: Role;
    page?: number;
    size?: number;
    sort?: string;
  }): RestResponse<PagedResponse<UserResponse>> {
    return this.httpClient.request({
      method: "GET",
      url: uriEncoding`api/users`,
      params: params,
    });
  }

  /**
   * HTTP POST /api/users/forgot-password
   * Java method: com.leopessoa.engineer.api.models.users.controller.UsersController.forgotPassword
   */
  forgotPassword(req: ForgotPasswordRequest): RestResponse<void> {
    return this.httpClient.request({
      method: "POST",
      url: uriEncoding`api/users/forgot-password`,
      data: req,
    });
  }

  /**
   * HTTP PATCH /api/users/password
   * Java method: com.leopessoa.engineer.api.models.users.controller.UsersController.updatePassword
   */
  updatePassword(
    requestDTO: UpdateUserPasswordRequest
  ): RestResponse<UserResponse> {
    return this.httpClient.request({
      method: "PATCH",
      url: uriEncoding`api/users/password`,
      data: requestDTO,
    });
  }

  /**
   * HTTP PATCH /api/users/reset-password
   * Java method: com.leopessoa.engineer.api.models.users.controller.UsersController.resetPassword
   */
  resetPassword(requestDTO: UpdateUserPasswordRequest): RestResponse<void> {
    return this.httpClient.request({
      method: "PATCH",
      url: uriEncoding`api/users/reset-password`,
      data: requestDTO,
    });
  }

  /**
   * HTTP GET /api/users/verify-email
   * Java method: com.leopessoa.engineer.api.models.users.controller.UsersController.verifyEmail
   */
  verifyEmail(params: { token: string }): RestResponse<RedirectView> {
    return this.httpClient.request({
      method: "GET",
      url: uriEncoding`api/users/verify-email`,
      params: params,
    });
  }

  /**
   * HTTP DELETE /api/users/{id}
   * Java method: com.leopessoa.engineer.api.models.users.controller.UsersController.user_delete
   */
  user_delete(id: number): RestResponse<boolean> {
    return this.httpClient.request({
      method: "DELETE",
      url: uriEncoding`api/users/${id}`,
    });
  }

  /**
   * HTTP GET /api/users/{id}
   * Java method: com.leopessoa.engineer.api.models.users.controller.UsersController.user_detail
   */
  user_detail(id: number): RestResponse<UserResponse> {
    return this.httpClient.request({
      method: "GET",
      url: uriEncoding`api/users/${id}`,
    });
  }

  /**
   * HTTP PUT /api/users/{id}
   * Java method: com.leopessoa.engineer.api.models.users.controller.UsersController.user_update
   */
  user_update(
    id: number,
    request: UpdateUserRequest
  ): RestResponse<UserResponse> {
    return this.httpClient.request({
      method: "PUT",
      url: uriEncoding`api/users/${id}`,
      data: request,
    });
  }

  /**
   * HTTP PATCH /api/users/{id}/profile-picture
   * Java method: com.leopessoa.engineer.api.models.users.controller.UsersController.updateProfilePicture
   */
  updateProfilePicture(
    id: number,
    params: { file: MultipartFile }
  ): RestResponse<UserResponse> {
    return this.httpClient.request({
      method: "PATCH",
      url: uriEncoding`api/users/${id}/profile-picture`,
      params: params,
    });
  }

  /**
   * HTTP POST /api/water-levels
   * Java method: com.leopessoa.engineer.api.models.waterLevels.controller.WaterLevelController.waterlevel_create
   */
  waterlevel_create(
    request: CreateWaterLevelRequest
  ): RestResponse<WaterLevelResponse> {
    return this.httpClient.request({
      method: "POST",
      url: uriEncoding`api/water-levels`,
      data: request,
    });
  }

  /**
   * HTTP GET /api/water-levels
   * Java method: com.leopessoa.engineer.api.models.waterLevels.controller.WaterLevelController.waterlevel_list
   */
  waterlevel_list(params?: {
    page?: number;
    size?: number;
  }): RestResponse<PagedResponse<WaterLevelResponse>> {
    return this.httpClient.request({
      method: "GET",
      url: uriEncoding`api/water-levels`,
      params: params,
    });
  }

  /**
   * HTTP DELETE /api/water-levels/{id}
   * Java method: com.leopessoa.engineer.api.models.waterLevels.controller.WaterLevelController.waterlevel_delete
   */
  waterlevel_delete(id: number): RestResponse<boolean> {
    return this.httpClient.request({
      method: "DELETE",
      url: uriEncoding`api/water-levels/${id}`,
    });
  }

  /**
   * HTTP GET /api/water-levels/{id}
   * Java method: com.leopessoa.engineer.api.models.waterLevels.controller.WaterLevelController.waterlevel_detail
   */
  waterlevel_detail(id: number): RestResponse<WaterLevelResponse> {
    return this.httpClient.request({
      method: "GET",
      url: uriEncoding`api/water-levels/${id}`,
    });
  }

  /**
   * HTTP PUT /api/water-levels/{id}
   * Java method: com.leopessoa.engineer.api.models.waterLevels.controller.WaterLevelController.waterlevel_update
   */
  waterlevel_update(
    id: number,
    request: UpdateWaterLevelRequest
  ): RestResponse<WaterLevelResponse> {
    return this.httpClient.request({
      method: "PUT",
      url: uriEncoding`api/water-levels/${id}`,
      data: request,
    });
  }
}

export type RestResponse<R> = Promise<R>;

export type CisternTypeEnum = "ALVENARIA" | "POLIPROPILENO" | "PEDRA";

export type RequestEvent = "ONLOAD" | "USER_INTERACTION";

export type DeniedReason = "NOT_SUPPORTED" | "NOT_GRANTED";

export type Role = "USER" | "ADMIN";

/**
 * Values:
 * - `CONTINUE`
 * - `SWITCHING_PROTOCOLS`
 * - `PROCESSING`
 * - `CHECKPOINT`
 * - `OK`
 * - `CREATED`
 * - `ACCEPTED`
 * - `NON_AUTHORITATIVE_INFORMATION`
 * - `NO_CONTENT`
 * - `RESET_CONTENT`
 * - `PARTIAL_CONTENT`
 * - `MULTI_STATUS`
 * - `ALREADY_REPORTED`
 * - `IM_USED`
 * - `MULTIPLE_CHOICES`
 * - `MOVED_PERMANENTLY`
 * - `FOUND`
 * - `MOVED_TEMPORARILY` - @deprecated
 * - `SEE_OTHER`
 * - `NOT_MODIFIED`
 * - `USE_PROXY` - @deprecated
 * - `TEMPORARY_REDIRECT`
 * - `PERMANENT_REDIRECT`
 * - `BAD_REQUEST`
 * - `UNAUTHORIZED`
 * - `PAYMENT_REQUIRED`
 * - `FORBIDDEN`
 * - `NOT_FOUND`
 * - `METHOD_NOT_ALLOWED`
 * - `NOT_ACCEPTABLE`
 * - `PROXY_AUTHENTICATION_REQUIRED`
 * - `REQUEST_TIMEOUT`
 * - `CONFLICT`
 * - `GONE`
 * - `LENGTH_REQUIRED`
 * - `PRECONDITION_FAILED`
 * - `PAYLOAD_TOO_LARGE`
 * - `REQUEST_ENTITY_TOO_LARGE` - @deprecated
 * - `URI_TOO_LONG`
 * - `REQUEST_URI_TOO_LONG` - @deprecated
 * - `UNSUPPORTED_MEDIA_TYPE`
 * - `REQUESTED_RANGE_NOT_SATISFIABLE`
 * - `EXPECTATION_FAILED`
 * - `I_AM_A_TEAPOT`
 * - `INSUFFICIENT_SPACE_ON_RESOURCE` - @deprecated
 * - `METHOD_FAILURE` - @deprecated
 * - `DESTINATION_LOCKED` - @deprecated
 * - `UNPROCESSABLE_ENTITY`
 * - `LOCKED`
 * - `FAILED_DEPENDENCY`
 * - `TOO_EARLY`
 * - `UPGRADE_REQUIRED`
 * - `PRECONDITION_REQUIRED`
 * - `TOO_MANY_REQUESTS`
 * - `REQUEST_HEADER_FIELDS_TOO_LARGE`
 * - `UNAVAILABLE_FOR_LEGAL_REASONS`
 * - `INTERNAL_SERVER_ERROR`
 * - `NOT_IMPLEMENTED`
 * - `BAD_GATEWAY`
 * - `SERVICE_UNAVAILABLE`
 * - `GATEWAY_TIMEOUT`
 * - `HTTP_VERSION_NOT_SUPPORTED`
 * - `VARIANT_ALSO_NEGOTIATES`
 * - `INSUFFICIENT_STORAGE`
 * - `LOOP_DETECTED`
 * - `BANDWIDTH_LIMIT_EXCEEDED`
 * - `NOT_EXTENDED`
 * - `NETWORK_AUTHENTICATION_REQUIRED`
 */
export type HttpStatus =
  | "CONTINUE"
  | "SWITCHING_PROTOCOLS"
  | "PROCESSING"
  | "CHECKPOINT"
  | "OK"
  | "CREATED"
  | "ACCEPTED"
  | "NON_AUTHORITATIVE_INFORMATION"
  | "NO_CONTENT"
  | "RESET_CONTENT"
  | "PARTIAL_CONTENT"
  | "MULTI_STATUS"
  | "ALREADY_REPORTED"
  | "IM_USED"
  | "MULTIPLE_CHOICES"
  | "MOVED_PERMANENTLY"
  | "FOUND"
  | "MOVED_TEMPORARILY"
  | "SEE_OTHER"
  | "NOT_MODIFIED"
  | "USE_PROXY"
  | "TEMPORARY_REDIRECT"
  | "PERMANENT_REDIRECT"
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "PAYMENT_REQUIRED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "METHOD_NOT_ALLOWED"
  | "NOT_ACCEPTABLE"
  | "PROXY_AUTHENTICATION_REQUIRED"
  | "REQUEST_TIMEOUT"
  | "CONFLICT"
  | "GONE"
  | "LENGTH_REQUIRED"
  | "PRECONDITION_FAILED"
  | "PAYLOAD_TOO_LARGE"
  | "REQUEST_ENTITY_TOO_LARGE"
  | "URI_TOO_LONG"
  | "REQUEST_URI_TOO_LONG"
  | "UNSUPPORTED_MEDIA_TYPE"
  | "REQUESTED_RANGE_NOT_SATISFIABLE"
  | "EXPECTATION_FAILED"
  | "I_AM_A_TEAPOT"
  | "INSUFFICIENT_SPACE_ON_RESOURCE"
  | "METHOD_FAILURE"
  | "DESTINATION_LOCKED"
  | "UNPROCESSABLE_ENTITY"
  | "LOCKED"
  | "FAILED_DEPENDENCY"
  | "TOO_EARLY"
  | "UPGRADE_REQUIRED"
  | "PRECONDITION_REQUIRED"
  | "TOO_MANY_REQUESTS"
  | "REQUEST_HEADER_FIELDS_TOO_LARGE"
  | "UNAVAILABLE_FOR_LEGAL_REASONS"
  | "INTERNAL_SERVER_ERROR"
  | "NOT_IMPLEMENTED"
  | "BAD_GATEWAY"
  | "SERVICE_UNAVAILABLE"
  | "GATEWAY_TIMEOUT"
  | "HTTP_VERSION_NOT_SUPPORTED"
  | "VARIANT_ALSO_NEGOTIATES"
  | "INSUFFICIENT_STORAGE"
  | "LOOP_DETECTED"
  | "BANDWIDTH_LIMIT_EXCEEDED"
  | "NOT_EXTENDED"
  | "NETWORK_AUTHENTICATION_REQUIRED";

export type SessionTrackingMode = "COOKIE" | "URL" | "SSL";

function uriEncoding(
  template: TemplateStringsArray,
  ...substitutions: any[]
): string {
  let result = "";
  for (let i = 0; i < substitutions.length; i++) {
    result += template[i];
    result += encodeURIComponent(substitutions[i]);
  }
  result += template[template.length - 1];
  return result;
}
