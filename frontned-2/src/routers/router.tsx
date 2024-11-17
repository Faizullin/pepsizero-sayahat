import Layout from "@/shared/layouts/Layout";
import RootLayout from "@/shared/layouts/RootLayout";
import {createBrowserRouter, createRoutesFromElements, Route,} from "react-router-dom";
import Home from "@/features/home/Home.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout/>}>
            <Route path="/" element={<Layout/>}>
                <Route path="/" element={<Home/>}/>
            </Route>
            {/*<Route path="/" element={<AuthLayout />}>*/}
            {/*  <Route path="auth/login" element={<Login />} />*/}
            {/*  <Route path="auth/register" element={<Register />} />*/}
            {/*  <Route path="auth/forgot-password" element={<ForgotPassword />} />*/}
            {/*  <Route*/}
            {/*    path="auth/password-reset/confirm"*/}
            {/*    element={<ForgotPasswordConfirm />}*/}
            {/*  />*/}
            {/*  <Route*/}
            {/*    path="auth/email/verify/"*/}
            {/*    element={<EmailVerification />} />*/}
            {/*  <Route*/}
            {/*    path="book"*/}
            {/*    element={*/}
            {/*      <ProtectedRoute>*/}
            {/*        <BookFormPage />*/}
            {/*      </ProtectedRoute>*/}
            {/*    }*/}
            {/*  />*/}
            {/*  <Route*/}
            {/*    path="bookings"*/}
            {/*    element={*/}
            {/*      <ProtectedRoute>*/}
            {/*        <BookingList />*/}
            {/*      </ProtectedRoute>*/}
            {/*    }*/}
            {/*  />*/}
            {/*  <Route*/}
            {/*    path="bookings/:id"*/}
            {/*    element={*/}
            {/*      <ProtectedRoute>*/}
            {/*        <BookingDetail />*/}
            {/*      </ProtectedRoute>*/}
            {/*    }*/}
            {/*  />*/}
            {/*  <Route path="blogs/:id" element={<BlogDetail />} />*/}
            {/*  <Route*/}
            {/*    path="/reviews/edit"*/}
            {/*    element={*/}
            {/*      <ProtectedRoute>*/}
            {/*        <ReviewFormPage />*/}
            {/*      </ProtectedRoute>*/}
            {/*    }*/}
            {/*  />*/}
            {/*  <Route*/}
            {/*    path="/reviews/edit/:id"*/}
            {/*    element={*/}
            {/*      <ProtectedRoute>*/}
            {/*        <ReviewFormPage />*/}
            {/*      </ProtectedRoute>*/}
            {/*    }*/}
            {/*  />*/}
            {/*  <Route*/}
            {/*    path="/reviews/my"*/}
            {/*    element={*/}
            {/*      <ProtectedRoute>*/}
            {/*        <ReviewList />*/}
            {/*      </ProtectedRoute>*/}
            {/*    }*/}
            {/*  />*/}
            {/*  <Route path="/contact" element={<ContactFormPage />} />*/}
            {/*  <Route path={ConstUrls.exception_404} element={<NotFoundExceptionPage />} />*/}
            {/*  <Route path={ConstUrls.exception_connection} element={<ConnectionErrorExceptionPage />} />*/}
            {/*  <Route path="*" element={<Navigate to={ConstUrls.exception_404} />} />*/}
            {/*</Route>*/}
        </Route>
    )
);

export default router;